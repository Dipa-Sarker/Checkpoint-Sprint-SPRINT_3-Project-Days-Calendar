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
}

//=============================================================
// EVENT LISTENERS
//=============================================================

//=============================================================
// INITIALISATION
//=============================================================
render();
