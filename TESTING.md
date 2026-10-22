# Testing

This document explains how the Days Calendar project was tested against the project requirements.

## 0. Opens on the current month

**Requirement:** The calendar shows the current month when the page loads.

**How it was tested:**

- Opened the website and checked that the heading, the month dropdown and the year all showed the current month and year

**Expected result:** The current year and month are displayed

**Result:** The calendar opened on the current year and month.

## 1. Commemorative-Day Date Calculations

**Requirement:** Calculate commemorative dates correctly for different years, including days defined by their occurrence in a month.

**How it was tested:**

- Ran the automated test suite using `npm test`.
- Tested Ada Lovelace Day, which falls on the second Tuesday in October.
- Checked October 2024: Ada Lovelace Day is 8 October and World Lemur Day is 25 October.
- Checked October 2020: Ada Lovelace Day is 13 October and World Lemur Day is 30 October.
- Checked International Binturong Day in May 2030, expected on 11 May.
- Tested the last Friday of October 2025, expected on 31 October.
- Tested the fourth Saturday of February 2026, expected on 28 February.
- Added an edge-case test for Ada Lovelace Day in year 99 to check that years below 100 are handled correctly.

**Expected result:** The calculated dates, months, years and weekdays are correct.

**Result:** The automated tests passed after the latest date-logic changes.

## 2. Calendar Layout

**Requirement:** Display a Sunday-first calendar grid with blank cells before the first day and after the last day where necessary.

**How it was tested:**

- Opened the website and checked the weekday headings start with Sunday.
- Checked the empty boxes before and after each month, using the four rubric months:
  - December 2024: 0 before, 4 after
  - February 2025: 6 before, 1 after
  - May 2025: 4 before, 0 after
  - February 2026: 0 before, 0 after
- Checked October 2024 is 5 rows of 7, with the 1st on a Tuesday and the 31st on a Thursday.
- Unit tests for the blank-box counts and month lengths are in `calendar.test.mjs`.

**Expected result:** Dates appear under the correct weekday, and the calendar grid is aligned correctly.

**Result:** All four rubric months and October 2024 matched the expected blank boxes and rows.

## 3. Previous and Next Month Navigation

**Requirement:** Allow users to navigate to previous and next months without first- or last-month restrictions.

**How it was tested:**

- Used the previous-month and next-month controls in the browser.
- Checked that the displayed month and year changed correctly.
- Checked navigation across a year boundary, such as December to January.
- Clicked through many months in both directions and checked the heading or dropdown never showed "NaN" or "undefined" or "null"

**Expected result:** Navigation displays the correct month and year, including across year boundaries.

**Result:** Navigation worked in both directions across year starts and ends with no "NaN", "undefined" or "null" shown.

## 4. Month and Year Selection

**Requirement:** Allow users to jump to a selected month and year, including years such as 1900 and 2050.

**How it was tested:**

- Used the month selector and year input.
- Selected different months and years.
- Checked that the calendar displayed the selected month and year.
- Checked years such as 1900 and 2050 by typing them into the year box.
- Typed invalid years (2030.5, an empty box, 0, 10000) and checked the alert appeared and the year re-set to current.
- Checked that the Previous and Next buttons are not limited by ths range. - they continue past 9999 December and before the year 1, Jan; and the heading and dropdown displays correctly without "NaN", "undefined" or "Null"

**Expected result:** The calendar recalculates its dates and layout for the selected month and year.
**Note**: the 1 to 9999 limit applies only to the typed years. The nav buttons are deliberately unrestricted, as the rubric requires them to work on every month.

**Result:** The calendar jumped to the chosen month and year, and invalid typed years were met with an alert rejection.

## 5. Display of Commemorative Days

**Requirement:** Display commemorative days on their correct dates using the shared date-calculation logic and supplied data.

**How it was tested:**

- Checked the commemorative days displayed in the browser.
- Compared displayed dates with the automated date-calculation tests.
- Checked October 2024 for Ada Lovelace Day on 8 October and World Lemur Day on 25 October.
- Checked dates across different years, including May 2030.

**Expected result:** Commemorative days appear on their calculated dates without incorrect dates being displayed.

**Result:** Commemorative days appeared on the expected dates in October 2024, October 2020 and May 2030.

## 6. Data-Driven Calendar

**Requirement:** Calculate dates from the supplied data and reusable logic rather than hard-coding dates for individual years.

**How it was tested:**

- Reviewed the date-calculation functions and calendar code.
- Checked that the calculations use the commemorative-day data, selected year and selected month.
- Ran tests covering multiple years, including 2020, 2024, 2025, 2026 and 2030, as well as a year-below-100 edge case.
- Added a test using a made-up day (fourth Saturday of February 2026) that is not in `days.json`, to check the date logic works for any rule, not just the supplied days. See `common.test.mjs`.
- Reviewed `web.mjs`, which builds every box with `createElement` and `append`, and gets its days from `days.json` through `common.mjs`, so nothing is hard-coded.
- Checked that only fixed page structure (headings, buttons, month options, weekday names) is in `index.html`. The days grid and all commemorative days are created in `web.mjs` using `createElement`.

**Expected result:** The same reusable logic calculates commemorative dates for different years.

**Result:** The date logic worked for days not in `days.json`. The grid and commemorative days are generated by JavaScript from the data and the shared functions, so nothing about specific days is hard-coded.

## 7. Unit Tests

**Requirement:** Include at least one unit test.

**How it was tested:** Unit tests in `common.test.mjs` and `calendar.test.mjs`

Ran `npm test` from the project directory, which runs both test files.

- `common.test.mjs` checks the commemorative-day date calculations: occurrence-based dates (second, fourth and last weekday), multiple years including 2020, 2024, 2025 and 2030, a month with no commemorative days, and a year below 100.
- `calendar.test.mjs` checks the calendar grid helper functions: the number of blank boxes before the 1st and after the last day, the number of days in a month (including leap-year February), and a year below 100.

**Expected result:** All automated tests pass.

**Result:** All tests in both files passed after the latest merged changes.

## 8. iCalendar Generation

**Requirement:** Generate `days.ics` containing all commemorative-day events for every year from 2020 through 2030 inclusive. Events must be all-day and non-recurring.

**How it was tested:**

- Ran `node generate-ical.mjs`.
- Counted event entries using `grep -c '^BEGIN:VEVENT' days.ics`.
- Confirmed that the generated file contained 55 event entries.
- Reviewed the generator to check that it processes the required years and commemorative-day data.
- Checked that events use all-day date fields and do not use recurring-event rules.

**Expected result:** The generated file contains the required events for 2020–2030, with all-day dates and no recurrence rules.

**Result:** The generator ran successfully and produced 55 event entries.

## 9. Shared Date Logic

**Requirement:** The website and the iCalendar generator use the same date-calculation code.

**How it was tested:**

- Checked that `web.mjs` and `generate-ical.mjs` both import from `common.mjs`.
- Compared dates in `days.ics` with the website, for example Ada Lovelace Day on 8 October 2024.

**Expected result:** Both produce the same dates.

**Result:** The dates matched.

## 10. Google Calendar Import

**Requirement:** Verify that the generated iCalendar file can be imported into Google Calendar and that event dates are correct.

**How it was tested:**

- Imported `days.ics` into Google Calendar.
- Checked the following event dates:
  - Ada Lovelace Day — 8 October 2024.
  - Ada Lovelace Day — 13 October 2020.
  - World Lemur Day — 25 October 2024.
  - International Binturong Day — 11 May 2030.

**Expected result:** Google Calendar accepts the file and displays events on the expected dates.

**Result:** The file was imported, and the listed dates were checked.

## 11. Accessibility

**Requirement:** Achieve a Lighthouse accessibility score of 100% for all calendar views.

**How it was tested:**

- Opened the website in Chrome.
- Opened Developer Tools and select Lighthouse.
- Run an audit with Accessibility selected.
- Repeated the audit on different calendar views, including months with and without commemorative days.

**Expected result:** Lighthouse reports an accessibility score of 100% for every tested view.

**Result:** Lighthouse (Snapshot, Desktop) scored 11/11 (100%) accessibility on the current month, October 2024 and February 2025. Keyboard navigation with Tab also worked.

## 12. No Dead Code

**Requirement:** All JavaScript and CSS must be used.

**How it was tested:**

- Read through every JavaScript and CSS file, checking each function, class and rule is used.
- Removed the starter placeholder and leftover comments.

**Expected result:** No unused or commented-out code remains.

**Result:** No dead code was found in the final review.

## 13. Final Regression Testing

**How it was tested:**

1. Run `npm test`.
2. Run `node generate-ical.mjs`.
3. Check the number of generated event entries.
4. Open the website in a browser.
5. Check month navigation, month/year selection, calendar alignment and commemorative-day display.

**Expected result:** Automated tests pass, the iCalendar file is generated correctly, and the calendar features continue to work.

**Result:** All steps were repeated on the deployed site after the final merge, and everything worked.
