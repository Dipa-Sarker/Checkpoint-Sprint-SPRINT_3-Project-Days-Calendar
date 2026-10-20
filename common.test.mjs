
import assert from "node:assert";
import test from "node:test";
import { readFile } from "node:fs/promises";

import { getCommemorativeDate,  getCommemorativeDaysForMonth,} from "./common.mjs";

// Read and parse the JSON file.
const daysData = JSON.parse(
  await readFile("./days.json", "utf8")
);

// Test that Ada Lovelace Day falls on the second Tuesday of October in different years.
test("Ada Lovelace Day falls on the second Tuesday of October", () => {
  const ada = daysData.find(
    (day) => day.name === "Ada Lovelace Day"
  );

  const date2024 = getCommemorativeDate(ada, 2024);
  const date2025 = getCommemorativeDate(ada, 2025);

  assert.equal(date2024.toDateString(), "Tue Oct 08 2024");
  assert.equal(date2025.toDateString(), "Tue Oct 14 2025");
});


// Test that Ada Lovelace Day and World Lemur Day fall on their expected dates in different years.
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
