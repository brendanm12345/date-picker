"use strict";

class DatePicker {
  constructor(id, callback) {
    this.id = id;
    this.callback = callback;
    this.currentDate = new Date();
    this.selectedDate = null;

    const datePickerElement = document.getElementById(this.id);
    datePickerElement.className = "container";
    datePickerElement.addEventListener(
      "click",
      this.handleDatePickerClick.bind(this)
    );
  }
  render(date) {
    this.currentDate = new Date(date);
    this.renderDatePicker();
  }

  handleDatePickerClick(event) {
    event.stopPropagation();

    const target = event.target;
    if (target.classList.contains("previous")) {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      console.log(this.currentDate);
      this.renderDatePicker();
    } else if (target.classList.contains("next")) {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.renderDatePicker();
    } else if (target.classList.contains("dayCell")) {
      const day = +target.textContent;
      if (
        typeof day === "number" &&
        !target.classList.contains("not-current-month")
      ) {
        this.selectedDate = {
          month: this.currentDate.getMonth() + 1,
          day: day,
          year: this.currentDate.getFullYear(),
        };
        this.callback(this.id, this.selectedDate);
        this.renderDatePicker();
      }
    }
  }

  renderDatePicker() {
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

    const datePickerHeader = document.createElement("div");
    datePickerHeader.className = "header";
    datePickerElement.appendChild(datePickerHeader);

    const monthYearHeader = document.createElement("span");
    monthYearHeader.className = "month-year-header";
    monthYearHeader.textContent =
      monthNames[this.currentDate.getMonth()] +
      " " +
      this.currentDate.getFullYear();
    datePickerHeader.appendChild(monthYearHeader);

    const prevButton = document.createElement("button");
    prevButton.className = "previous";
    prevButton.textContent = "<";
    datePickerHeader.appendChild(prevButton);

    const nextButton = document.createElement("button");
    nextButton.className = "next";
    nextButton.textContent = ">";
    datePickerHeader.appendChild(nextButton);

    const table = document.createElement("table");
    datePickerElement.appendChild(table);

    const headerRow = document.createElement("tr");
    headerRow.clasName = "header-row-days";
    table.appendChild(headerRow);

    // make header row
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    for (const day of daysOfWeek) {
      const headerCell = document.createElement("th");
      headerCell.innerHTML = day;
      headerCell.className = "header-day";
      headerRow.appendChild(headerCell);
    }

    const month = this.currentDate.getMonth();
    const year = this.currentDate.getFullYear();
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
        } else if (currentDay > numDaysInMonth) {
          if (j === 0) {
            break;
          }
          dayCell.innerHTML = nextMonthDay;
          dayCell.classList.add("not-current-month");
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
    }
  }
}
