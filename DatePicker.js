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

    const headerRow = document.createElement("tr");
    table.appendChild(headerRow);

    // make header row
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    for (const day of daysOfWeek) {
      const headerCell = document.createElement("th");
      headerCell.innerHTML = day;
      headerRow.appendChild(headerCell);
    }

    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDay.getDate();
    const firstWeekday = firstDay.getDay();
    const prevLastDay = new Date(year, month, 0);
    const numDaysInPrevMonth = prevLastDay.getDate();

    let currentDay = 1;
    let nextMonthDay = 1;

    for (let i = 0; i < 6; i++) {
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
          if (j === 0) {
            break;
          }
          dayCell.innerHTML = nextMonthDay;
          nextMonthDay++;
        } else {
          dayCell.innerHTML = currentDay;
          if (currentDay === this.currentDate.getDate()) {
            dayCell.classList.add("current-day");
          }
          
          currentDay++;
        }
        weekRow.appendChild(dayCell);
      }
      //const cells = weekRow.getElementsByTagName("td");
      //const firstCell = cells[0];
      //const lastCell = cells[6];

      //const prevCell = weekRow.previousElementSibling?.querySelector('td:first-child');

      //const prevFirstCell = prevRow.getElementsByTagName('td')[0];
      //   console.log(firstCell.textContent + " " + lastCell.textContent);
      //   if (+firstCell.textContent - +lastCell.textContent < 6 &&) {
      //     console.log("INSIDE");
      //     table.removeChild(weekRow);
      //   }
    }
  }
}
