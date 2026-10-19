//=============================================================
// IMPORTS
//=============================================================
import { getBlanksBefore, getDaysInMonth } from "./calendar.mjs";

//=============================================================
// MONTH NAMES: lookup table from month number (0–11) to name
//=============================================================

const monthNames = [
  "January", // 0
  "February", // 1
  "March", // 2
  "April", // 3
  "May", // 4
  "June", // 5
  "July", // 6
  "August", // 7
  "September", // 8
  "October", // 9
  "November", // 10
  "December", // 11
];
//=============================================================
// DOM elements
//=============================================================
const monthYearHeading = document.getElementById("month-year-heading");
const monthSelect = document.getElementById("month-select");
const yearInput = document.getElementById("year-input");
const calendarGrid = document.getElementById("calendar-grid");
//=============================================================
// STATE
//=============================================================

// Starts as today's month and year, only changed with setState()
let state = {
  month: new Date().getMonth(), // 0–11 - Today: 9 (October)
  year: new Date().getFullYear(), // 4-digit year - Today: 2026
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

  // Get the two numbers for this month from calendar.mjs.
  const blanksBefore = getBlanksBefore(state.year, state.month);
  const daysInMonth = getDaysInMonth(state.year, state.month);

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
    calendarGrid.append(dayGridBox);
  }
}

//=============================================================
// EVENT LISTENERS
//=============================================================

//=============================================================
// INITIALISATION
//=============================================================
render();
