import { describe, test } from "node:test";
import assert from "node:assert";
import {
  getBlanksBefore,
  getDaysInMonth,
  getBlanksAfter,
} from "./calendar.mjs";

//--------------------------------------
// testing getBlanksBefore
//--------------------------------------

describe("getBlanksBefore()", () => {
  test("should return 4 when the 1st is a Thursday (Oct 2026)", () => {
    assert.strictEqual(getBlanksBefore(2026, 9), 4);
  });
  test("should return 2 when the 1st is a Tuesday (Oct 2024)", () => {
    assert.strictEqual(getBlanksBefore(2024, 9), 2);
  });
  test("should return 0 when the 1st is a Sunday (Feb 2026)", () => {
    assert.strictEqual(getBlanksBefore(2026, 1), 0);
  });
  test("should return 4 when the 1st is a Thursday in a leap year (Feb 2024)", () => {
    assert.strictEqual(getBlanksBefore(2024, 1), 4);
  });
});

//--------------------------------------
// testing getBlanksAfter
//--------------------------------------

describe("getBlanksAfter()", () => {
  test("should return 0 when the last day is a Saturday (Oct 2026)", () => {
    assert.strictEqual(getBlanksAfter(2026, 9), 0);
  });
  test("should return 2 when the last day is a Thursday in a leap year (Feb 2024)", () => {
    assert.strictEqual(getBlanksAfter(2024, 1), 2);
  });
  test("should return 4 when the last day is a Tuesday (Dec 2024)", () => {
    assert.strictEqual(getBlanksAfter(2024, 11), 4);
  });
});

//--------------------------------------
// testing getDaysInMonth
//--------------------------------------

describe("getDaysInMonth()", () => {
  test("should return 31 for Oct 2026", () => {
    assert.strictEqual(getDaysInMonth(2026, 9), 31);
  });
  test("should return 29 for Feb 2024- leap year", () => {
    assert.strictEqual(getDaysInMonth(2024, 1), 29);
  });
  test("should return 28 for Feb 2025 - not leap year", () => {
    assert.strictEqual(getDaysInMonth(2025, 1), 28);
  });
});

//--------------------------------------
// testing small years under 100 are not treated as 1900s
//--------------------------------------

describe("years below 100", () => {
  test("Jan 1st in year 99 is a Thu - in 1999 it was a Fri", () => {
    assert.strictEqual(getBlanksBefore(99, 0), 4);
  });
});
