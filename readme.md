# Days Calendar

A small website that shows a monthly calendar with commemorative days that fall on a pattern rather than a fixed date (for example, Ada Lovelace Day is the second Tuesday of October). The dates are calculated for any year from a data file, and the same calculation is used to generate a calendar file you can import into Google Calendar.

The site is live at: https://edinakurdi.github.io/Checkpoint-SPRINT_3-Project-Days-Calendar/

## Built with

HTML, JavaScript, CSS

## What the website does

- Opens on the current month, with the first column showing Sundays
- Shows every day of the month as a box, with blank boxes before the 1st and after the last day to complete the weeks
- Lets you move to the previous or next month with buttons, with no first or last month
- Lets you jump to any month and year using a dropdown and a year box (typed years must be whole numbers from 1 to 9999)
- Shows each commemorative day on the correct date, for any year
- Works with any day added to or removed from `days.json`, because nothing about specific days is hard-coded
- Handles years below 100 correctly, instead of treating them as 1900s

## Generating the Google Calendar file

Run `node generate-ical.mjs` to create `days.ics`, with one all-day event per commemorative day per year from 2020 to 2030 (no recurring events). It can be imported into Google Calendar and uses the same date calculation as the website.

## How it is organised

- `common.mjs`: the shared date calculations, used by both the website and the iCal generator
- `calendar.mjs`: functions that work out the blank boxes and the number of days for the calendar grid
- `web.mjs` and `index.html`: the page, its state, and drawing the calendar
- `generate-ical.mjs`: creates `days.ics`
- `days.json`: the commemorative days

## How to run it

1. Clone the repo
2. In the project folder, run `npx http-server`
3. Open the address it prints (for example http://127.0.0.1:8080)

## How to test it

Requires Node 18 or later, because the tests use Node's built-in test runner (`node:test`).

Run `npm test`

The tests check the commemorative-day date calculations (`common.test.mjs`) and the calendar grid functions (`calendar.test.mjs`). See `TESTING.md` for how each requirement was tested.

## Accessibility

- Every view scores 100% in Lighthouse (Desktop, Snapshot mode)

## Built by

Dipa Sarker and Edina Kurdi
