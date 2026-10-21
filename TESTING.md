# Testing

This document explains how the Days Calendar project was tested against the project requirements.

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

- Opened the website in a browser.
- Checked the weekday headings and date alignment.
- Checked the blank cells before the first date and after the last date.
- Ran unit tests for calendar helper functions, including the number of blank cells before a month and the number of days in a month.

**Expected result:** Dates appear under the correct weekday, and the calendar grid is aligned correctly.

## 3. Previous and Next Month Navigation

**Requirement:** Allow users to navigate to previous and next months without first- or last-month restrictions.

**How it was tested:**

- Used the previous-month and next-month controls in the browser.
- Checked that the displayed month and year changed correctly.
- Checked navigation across a year boundary, such as December to January.

**Expected result:** Navigation displays the correct month and year, including across year boundaries.

## 4. Month and Year Selection

**Requirement:** Allow users to jump to a selected month and year, including years such as 1900 and 2050.

**How it was tested:**

- Used the month selector and year input.
- Selected different months and years.
- Checked that the calendar displayed the selected month and year.
- Checked support for years outside the usual current range.

**Expected result:** The calendar recalculates its dates and layout for the selected month and year.

## 5. Display of Commemorative Days

**Requirement:** Display commemorative days on their correct dates using the shared date-calculation logic and supplied data.

**How it was tested:**

- Checked the commemorative days displayed in the browser.
- Compared displayed dates with the automated date-calculation tests.
- Checked October 2024 for Ada Lovelace Day on 8 October and World Lemur Day on 25 October.
- Checked dates across different years, including May 2030.

**Expected result:** Commemorative days appear on their calculated dates without incorrect dates being displayed.

## 6. Data-Driven Calendar

**Requirement:** Calculate dates from the supplied data and reusable logic rather than hard-coding dates for individual years.

**How it was tested:**

- Reviewed the date-calculation functions and calendar code.
- Checked that the calculations use the commemorative-day data, selected year and selected month.
- Ran tests covering multiple years, including 2020, 2024, 2025, 2026 and 2030, as well as a year-below-100 edge case.

**Expected result:** The same reusable logic calculates commemorative dates for different years.

## 7. Unit Tests

**Requirement:** Include at least one unit test.

**How it was tested:** Unit tests in `common.test.mjs`.

Ran `npm test` from the project directory to execute the automated tests. The tests check commemorative-day date calculations, occurrence-based dates, edge cases and calendar helper functions.

**Expected result:** All automated tests pass.

**Result:** The automated test suite passed after the latest merged changes.

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

## 9. Google Calendar Import

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

## 10. Accessibility

**Requirement:** Achieve a Lighthouse accessibility score of 100% for all calendar views.

**How it should be tested:**

- Open the website in Chrome.
- Open Developer Tools and select Lighthouse.
- Run an audit with Accessibility selected.
- Repeat the audit on different calendar views, including months with and without commemorative days.
- Check and fix any reported accessibility issues, then run the audits again.

**Expected result:** Lighthouse reports an accessibility score of 100% for every tested view.

**Result:** Record the actual scores after completing the audits. This requirement should only be marked as passed when all required views score 100%.

## 11. Final Regression Testing

**How it was tested:**

1. Run `npm test`.
2. Run `node generate-ical.mjs`.
3. Check the number of generated event entries.
4. Open the website in a browser.
5. Check month navigation, month/year selection, calendar alignment and commemorative-day display.

**Expected result:** Automated tests pass, the iCalendar file is generated correctly, and the calendar features continue to work.
