import { createDate } from "./common.mjs";

export function getBlanksBefore(year, month) {
  //returns how many blank boxes go before the 1st of the month
  // This equals the weekday number of the 1st (0: Sun, etc)
  // month is 0 indexed too
  const firstOfMonth = createDate(year, month, 1);
  return firstOfMonth.getDay(); //this gives the week day number (0-6), this is also how many boxes are before it in a grid
}

//returns how many days the month [month: 0-11] has (28–31)
// Day 0 of the next month is the last day of this month.
export function getDaysInMonth(year, month) {
  const lastOfMonth = createDate(year, month + 1, 0);
  return lastOfMonth.getDate();
}

export function getBlanksAfter(year, month) {
  //returns how many blank boxes go after end of the month
  const lastOfMonth = createDate(year, month + 1, 0);
  return 6 - lastOfMonth.getDay();
}
