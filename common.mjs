// The month names are shared by the website and the iCal generator.
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Convert a weekday name into a JavaScript weekday number.
// Sunday = 0, Monday = 1, Tuesday = 2, ..., Saturday = 6.
function getWeekdayNumber(dayName) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekdays.indexOf(dayName);
}

// changing how date is created, since with new Date(), years 0-99 is treated as 1900-1999
export function createDate(year, monthIndex, day) {
  const date = new Date(2026, 9, 26);
  date.setFullYear(year, monthIndex, day);
  return date;
}

// Calculate the date of one commemorative day in a given year.
export function getCommemorativeDate(day, year) {
  // Find the month number.
  const monthIndex = monthNames.indexOf(day.monthName);

  // Find the weekday number.
  const weekdayNumber = getWeekdayNumber(day.dayName);

  // Check that the supplied information is valid.
  if (monthIndex === -1 || weekdayNumber === -1) {
    throw new Error("Invalid month name or weekday name");
  }

  // Find the first day of the month.
  const firstDay = createDate(year, monthIndex, 1);

  // Find the weekday of the first day.
  const firstWeekday = firstDay.getDay();

  // Calculate how many days to move forward
  // to reach the first matching weekday.
  const daysToAdd = (weekdayNumber - firstWeekday + 7) % 7;

  // Find the date of the first matching weekday.
  const firstOccurrence = 1 + daysToAdd;

  // Handle the "last" occurrence separately.
  if (day.occurrence === "last") {
    // The day before the first day of the next month
    // is the last day of this month.
    const lastDay = createDate(year, monthIndex + 1, 0);

    // Start from the last day of the month.
    const lastDate = lastDay.getDate();
    const lastWeekday = lastDay.getDay();

    // Count backwards to find the required weekday.
    const daysToSubtract = (lastWeekday - weekdayNumber + 7) % 7;

    return createDate(year, monthIndex, lastDate - daysToSubtract);
  }

  // Handle first, second and third, and fourth occurrences.
  const occurrenceNumbers = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
  };

  const occurrenceNumber = occurrenceNumbers[day.occurrence];

  // Reject occurrence names that we do not support.
  if (occurrenceNumber === undefined) {
    throw new Error("Invalid weekday occurrence");
  }

  // Each occurrence is seven days after the previous one.
  const dateNumber = firstOccurrence + (occurrenceNumber - 1) * 7;

  return createDate(year, monthIndex, dateNumber);
}

/*
 * Find all commemorative days that occur in a particular month
 * and year.
 * daysData: the array of commemorative days from days.json
 * year: the year we want to check, for example 2024
 * monthIndex: the month number, from 0 (January) to 11 (December)
 */

export function getCommemorativeDaysForMonth(daysData, year, monthIndex) {
  // Create an empty array to store the matching commemorative days.
  const result = [];

  // Go through each commemorative day in the data.
  for (const day of daysData) {
    // Find the month index for this commemorative day.
    const dayMonthIndex = monthNames.indexOf(day.monthName);

    // Skip this day if it belongs to a different month.
    if (dayMonthIndex !== monthIndex) {
      continue;
    }

    // Calculate the actual date of the commemorative day.
    const date = getCommemorativeDate(day, year);

    // Add the event name and day number to the result array.
    result.push({
      name: day.name,
      day: date.getDate(),
    });
  }

  // Return all commemorative days found in the requested month.
  return result;
}
