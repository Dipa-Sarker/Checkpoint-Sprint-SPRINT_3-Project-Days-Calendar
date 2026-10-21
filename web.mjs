//=============================================================
// IMPORTS
//=============================================================
import {
  getBlanksBefore,
  getDaysInMonth,
  getBlanksAfter,
} from "./calendar.mjs";

import { getCommemorativeDaysForMonth, monthNames } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

//=============================================================
// DOM elements
//=============================================================
const monthYearHeading = document.getElementById("month-year-heading");
const monthSelect = document.getElementById("month-select");
const yearInput = document.getElementById("year-input");
const calendarGrid = document.getElementById("calendar-grid");
const previousMonthBtn = document.getElementById("previous-month-btn");
const nextMonthBtn = document.getElementById("next-month-btn");

//=============================================================
// STATE
//=============================================================

// Starts as today's month and year, only changed with setState()
let state = {
  month: new Date().getMonth(), // 0–11 - Eg: 9  = October
  year: new Date().getFullYear(), // 4-digit year - Eg: 2026
};

//=============================================================
// CHANGE STATE
//=============================================================
function setState(updates) {
  state = { ...state, ...updates }; // update state according to changes made
  render(); // redraw the page
}
//=============================================================
// RENDER
//=============================================================

function render() {
  // 1. Heading: turn the month number into month name, add the year to display
  //    e.g. state = { month: 9, year: 2026 } → "October 2026"
  monthYearHeading.textContent = `${monthNames[state.month]} ${state.year}`;

  // 2. Dropdown: select the <option> whose value matches state.month
  monthSelect.value = state.month; // state.month starts as the CURRENT month

  // 3. Year box: show the year from state
  //    Also "resets" the box if the user typed something invalid
  yearInput.value = state.year;

  // 4. Calendar grid: rebuild it for the month in state.
  // empty the grid
  calendarGrid.replaceChildren();

  // Get the three numbers for this month from calendar.mjs.
  const blanksBefore = getBlanksBefore(state.year, state.month);
  const blanksAfter = getBlanksAfter(state.year, state.month);
  const daysInMonth = getDaysInMonth(state.year, state.month);

  const commDaysList = getCommemorativeDaysForMonth(
    daysData,
    state.year,
    state.month,
  );

  // Add one blank box per empty slot before the 1st
  for (let i = 0; i < blanksBefore; i++) {
    const blankGridBox = document.createElement("div");
    blankGridBox.classList.add("blank-grid-box");
    calendarGrid.append(blankGridBox);
  }

  // Add one numbered box per day
  for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
    const dayGridBox = document.createElement("div");
    dayGridBox.classList.add("day-grid-box");
    dayGridBox.textContent = dayNumber;
    //loop through that list, and for each match, append an element with the day's name
    for (const commDay of commDaysList) {
      if (commDay.day === dayNumber) {
        const dayLabelPara = document.createElement("p");
        dayLabelPara.textContent = commDay.name;
        dayGridBox.append(dayLabelPara);
      }
    }
    calendarGrid.append(dayGridBox);
  }

  // Add one blank box per empty slot after last day
  for (let i = 0; i < blanksAfter; i++) {
    const blankGridBox = document.createElement("div");
    blankGridBox.classList.add("blank-grid-box");
    calendarGrid.append(blankGridBox);
  }
}

//=============================================================
// ACTIONS
//=============================================================

function goToPreviousMonth() {
  //start from the current values in state
  let previousMonth = state.month - 1;
  let previousYear = state.year;

  if (previousMonth < 0) {
    previousMonth = 11;
    previousYear = previousYear - 1;
  }

  setState({ month: previousMonth, year: previousYear });
}

function goToNextMonth() {
  //start from the current values in state
  let nextMonth = state.month + 1;
  let nextYear = state.year;

  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear = nextYear + 1;
  }

  setState({ month: nextMonth, year: nextYear });
}

function handleMonthChange() {
  setState({ month: Number(monthSelect.value) });
}

// Year box: jump to the typed year, but only if it's a valid year.
function handleYearChange() {
  // Read what was typed (text) and convert it to a number and save
  const newYear = Number(yearInput.value);

  // Valid = a whole number from 1 to 9999.
  if (Number.isInteger(newYear) && newYear >= 1 && newYear <= 9999) {
    setState({ year: newYear });
  } else {
    render();
    alert("Please enter a valid year between 1 and 9999.");
  }
}

//=============================================================
// EVENT LISTENERS
//=============================================================

previousMonthBtn.addEventListener("click", goToPreviousMonth);
nextMonthBtn.addEventListener("click", goToNextMonth);
monthSelect.addEventListener("change", handleMonthChange);
yearInput.addEventListener("change", handleYearChange);

//=============================================================
// INITIALISATION
//=============================================================
render();
