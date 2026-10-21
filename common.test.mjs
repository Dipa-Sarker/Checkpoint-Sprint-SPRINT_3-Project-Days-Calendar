import assert from "node:assert";
import test from "node:test";
import { readFile } from "node:fs/promises";

import {
  getCommemorativeDate,
  getCommemorativeDaysForMonth,
} from "./common.mjs";

// Read and parse the JSON file.
const daysData = JSON.parse(await readFile("./days.json", "utf8"));

// Test that Ada Lovelace Day falls on the second Tuesday of October in different years.
test("Ada Lovelace Day falls on the second Tuesday of October", () => {
  const ada = daysData.find((day) => day.name === "Ada Lovelace Day");

  const date2024 = getCommemorativeDate(ada, 2024);
  const date2025 = getCommemorativeDate(ada, 2025);

  assert.equal(date2024.toDateString(), "Tue Oct 08 2024");
  assert.equal(date2025.toDateString(), "Tue Oct 14 2025");
});

// October 2024 returns both Ada Lovelace Day and World Lemur Day.
test("October 2024 returns Ada Lovelace Day and World Lemur Day", () => {
  const result = getCommemorativeDaysForMonth(daysData, 2024, 9);

  // Check that the function returns the expected events
  // with their correct day numbers.
  assert.deepEqual(result, [
    { name: "Ada Lovelace Day", day: 8 },
    { name: "World Lemur Day", day: 25 },
  ]);
});

// Test that a month without commemorative days returns an empty array.
test("June 2024 returns no commemorative days", () => {
  const result = getCommemorativeDaysForMonth(daysData, 2024, 5);

  assert.deepEqual(result, []);
});

// Test that years below 100 are handled correctly.
test("Ada Lovelace Day is calculated correctly in year 99", () => {
  const ada = daysData.find((day) => day.name === "Ada Lovelace Day");

  const date = getCommemorativeDate(ada, 99);

  assert.equal(date.getFullYear(), 99);
  assert.equal(date.getMonth(), 9); // October
  assert.equal(date.getDate(), 13);
  assert.equal(date.getDay(), 2); // Tuesday
});

// Test that Ada Lovelace Day is calculated correctly in 2020.
test("Ada Lovelace Day falls on 13 October 2020", () => {
  const ada = daysData.find((day) => day.name === "Ada Lovelace Day");

  const date = getCommemorativeDate(ada, 2020);

  assert.equal(date.getFullYear(), 2020);
  assert.equal(date.getMonth(), 9); // October
  assert.equal(date.getDate(), 13);
  assert.equal(date.getDay(), 2); // Tuesday
});

// Test that International Binturong Day is calculated correctly in 2030.
test("International Binturong Day falls on 11 May 2030", () => {
  const binturong = daysData.find(
    (day) => day.name === "International Binturong Day",
  );

  const date = getCommemorativeDate(binturong, 2030);

  assert.equal(date.getFullYear(), 2030);
  assert.equal(date.getMonth(), 4); // May
  assert.equal(date.getDate(), 11);
  assert.equal(date.getDay(), 6); // Saturday
});

// Test that the last Friday of October can fall on the month's final day.
test("World Lemur Day falls on 31 October 2025", () => {
  const lemur = daysData.find((day) => day.name === "World Lemur Day");

  const date = getCommemorativeDate(lemur, 2025);

  assert.equal(date.getFullYear(), 2025);
  assert.equal(date.getMonth(), 9); // October
  assert.equal(date.getDate(), 31);
  assert.equal(date.getDay(), 5); // Friday
});

// test an arbitrary 4th occurrence
// Feb 2026 starts on a Sun, so the fourth Sat is the 28th
test("Fourth Sat of Feb 2026 is the 28th", () => {
  //made up day
  const testDay = {
    name: "Test",
    monthName: "February",
    dayName: "Saturday",
    occurrence: "fourth",
  };
  const date = getCommemorativeDate(testDay, 2026);

  assert.equal(date.toDateString(), "Sat Feb 28 2026");
});
