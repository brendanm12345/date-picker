"use strict";

class DatePicker {
  constructor(id, callback) {
    this.id = id;
    this.callback = callback;
    this.currentDate = new Date();
    this.selectedDate = null;

    //const datePickerElement = document.getElementById(this.id);
    // datePickerElement.addEventListener(
    //   "click",
    //   this.handleDatePickerClick.bind(this)
    // );
  }

  render(date) {
    this.currentDate = new Date(date);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const datePickerElement = document.getElementById(this.id);
    datePickerElement.innerHTML = "";

    const monthYearHeader = document.createElement("div");
    monthYearHeader.className = "month-year-header";
    monthYearHeader.textContent =
      monthNames[date.getMonth()] + " " + date.getFullYear();
    datePickerElement.appendChild(monthYearHeader);

    const table = document.createElement("table");
    datePickerElement.appendChild(table);
    //let header = document.createElement("thead");
    //table.appendChild(thead);
    const headerRow = document.createElement("tr");
    table.appendChild(headerRow);

    // make header row
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    for (const day of daysOfWeek) {
      const headerCell = document.createElement("th");
      headerCell.innerHTML = day;
      headerRow.appendChild(headerCell);
    }

    // array of weeks
    const days = [];
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDay.getDate();
    const firstWeekday = firstDay.getDay();
    const prevLastDay = new Date(year, month, 0);
    const numDaysInPrevMonth = prevLastDay.getDate();
    //const prevMonthDay = numDaysInPrevMonth - firstWeekday + 1;
    let currentDay = 1;
    let nextMonthDay = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      const weekRow = document.createElement("tr");
      weekRow.className = "weekRow";
      table.appendChild(weekRow);
      // iterate through days to fill each row
      for (let j = 0; j < 7; j++) {
        const dayCell = document.createElement("td");
        dayCell.className = "dayCell";
        if (i === 0 && j < firstWeekday) {
          // add previous month
          dayCell.innerHTML = numDaysInPrevMonth - firstWeekday + j + 1;
          dayCell.classList.add("not-current-month");
          // new Date(year, month - 1, numDaysInPrevMonth - firstWeekday + j + 1)
          // week.push(new Date(year, month - 1, numDaysInPrevMonth - firstWeekday + j + 1))
        } else if (currentDay > numDaysInMonth) {
          dayCell.innerHTML = nextMonthDay;
          nextMonthDay++;
        } else {
          week.push(currentDay);
          dayCell.innerHTML = currentDay;
          currentDay++;
        }
        weekRow.appendChild(dayCell);
      }
      days.push(week);
    }
  }
}

// const table = document.createElement("table");
// datePickerElement.appendChild(table);
// //let header = document.createElement("thead");
// //table.appendChild(thead);
// const headerRow = document.createElement("tr");
// table.appendChild(headerRow);

// // make header row
// const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
// for (const day of daysOfWeek) {
//   const headerCell = document.createElement("th");
//   headerCell.innerHTML = day;
//   headerRow.appendChild(headerCell);
// }
//  const dayNamesRow = document.createElement("div");
// dayNamesRow.className = "day-names-row";
// const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
// for (let i = 0; i < dayNames.length; i++) {
//   const dayNameCell = document.createElement("div");
//   dayNameCell.textContent = dayNames[i];
//   dayNamesRow.appendChild(dayNameCell);
// }
// datePickerElement.appendChild(dayNamesRow);

//const days = date.getDate();
// let dateArray = this.getMonthDaysArray(date);
//this.makeTable(date);
// for (let i = 0; i < 7; i++) {
//   const weekRow = document.createElement("div");
//   weekRow.className = "week-row";
//   for (let j = 0; j < 4; j++) {
//     const dayCell = document.createElement("div");
//     dayCell.textContent = 7;
//     dayCell.className = "day";
//     weekRow.appendChild(dayCell);
//   }
//   datePickerElement.appendChild(weekRow);
// }
//}

//   makeTable(date) {
//     const table = document.createElement("table");
//     this.datePickerElement.appendChild(table);
//     //let header = document.createElement("thead");
//     //table.appendChild(thead);
//     const headerRow = document.createElement("tr");
//     table.appendChild(headerRow);

//     // make header row
//     const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
//     for (const day of daysOfWeek) {
//       const headerCell = document.createElement("th");
//       headerCell.innerHTML = day;
//       headerRow.appendChild(headerCell);
//     }

//     // array of weeks
//     const days = [];
//     const month = date.getMonth();
//     const year = date.getFullYear();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const numDaysInMonth = lastDay.getDate();
//     const firstWeekday = firstDay.getDay();
//     const prevLastDay = new Date(year, month, 0);
//     const numDaysInPrevMonth = prevLastDay.getDate();
//     //const prevMonthDay = numDaysInPrevMonth - firstWeekday + 1;
//     let currentDay = 1;
//     let nextMonthDay = 1;

//     for (let i = 0; i < 6; i++) {
//       const week = [];
//       const weekRow = document.createElement("tr");
//       weekRow.className = "weekRow";
//       table.appendChild(weekRow);
//       // iterate through days to fill each row
//       for (let j = 0; j < 7; j++) {
//         const dayCell = document.createElement("td");
//         dayCell.className = "dayCell";
//         if (i === 0 && j < firstWeekday) {
//           // add previous month
//           dayCell.innerHTML = numDaysInPrevMonth - firstWeekday + j + 1;
//           // new Date(year, month - 1, numDaysInPrevMonth - firstWeekday + j + 1)
//           // week.push(new Date(year, month - 1, numDaysInPrevMonth - firstWeekday + j + 1))
//         } else if (currentDay > numDaysInMonth) {
//           dayCell.innerHTML = nextMonthDay;
//           nextMonthDay++;
//         } else {
//           week.push(currentDay);
//           dayCell.innerHTML = currentDay;
//           currentDay++;
//         }
//         weekRow.appendChild(dayCell);
//       }
//       days.push(week);
//     }
//   }
// }
