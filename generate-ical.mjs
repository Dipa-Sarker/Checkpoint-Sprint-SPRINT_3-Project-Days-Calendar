// Import the function that calculates the date of a commemorative day.
import { getCommemorativeDate } from "./common.mjs";

// Import functions for reading and writing files.
import { readFile, writeFile } from "node:fs/promises";

// Read days.json and convert its contents into JavaScript data.
const daysData = JSON.parse(await readFile("./days.json", "utf8"));

// Check how many commemorative days were loaded.
console.log(`There are ${daysData.length} known commemorative days.`);

// Convert a date into the YYYYMMDD format required by iCal.
function formatICalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

// Create an iCal entry for one commemorative day.
function createICalEvent(day, year, date) {
  const startDate = formatICalDate(date);

  const nextDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );

  const endDate = formatICalDate(nextDay);

  return [
    "BEGIN:VEVENT",
    `UID:${day.name.replaceAll(" ", "-").toLowerCase()}-${year}@days-calendar`,
    `DTSTAMP:${new Date()
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")}`,
    `SUMMARY:${day.name}`,
    `DTSTART;VALUE=DATE:${startDate}`,
    `DTEND;VALUE=DATE:${endDate}`,
    "END:VEVENT",
  ].join("\r\n");
}

// Store all generated calendar events.
const events = [];

// Generate an event for every commemorative day from 2020 to 2030.
for (let year = 2020; year <= 2030; year++) {
  for (const day of daysData) {
    const date = getCommemorativeDate(day, year);

    const event = createICalEvent(day, year, date);

    events.push(event);
  }
}

// Combine the header, all events, and the footer into one calendar.
const calendarContent = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Days Calendar//EN",
  ...events,
  "END:VCALENDAR",
].join("\r\n");

// Save the generated calendar to days.ics.
await writeFile("days.ics", `${calendarContent}\r\n`, "utf8");

console.log(`Generated ${events.length} calendar events.`);
console.log("Calendar saved to days.ics");
