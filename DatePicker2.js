"use strict";

class DatePicker {
  constructor(id, callback) {
    this.id = id;
    this.callback = callback;
    this.currentDate = new Date();
    this.selectedDate = null;

    const datePickerElement = document.getElementById(this.id);
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
      this.renderDatePicker();
    } else if (target.classList.contains("next")) {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.renderDatePicker();
    } else if (target.classList.contains("day")) {
      const day = parseInt(target.textContent, 10);
      if (!day.NaN() && target.classList.contains("current-month")) {
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
    const datePickerElement = document.getElementById(this.id);
    datePickerElement.innerHTML = "";

    const monthYearHeader = document.createElement("div");
    monthYearHeader.className = "month-year-header";
    //monthYearHeader.textContent = this.getMonthYearString(this.currentDate);
    datePickerElement.appendChild(monthYearHeader);

    const dayNamesRow = document.createElement("div");
    dayNamesRow.className = "day-names-row";
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    for (let i = 0; i < dayNames.length; i++) {
      const dayNameCell = document.createElement("div");
      dayNameCell.textContent = dayNames[i];
      dayNamesRow.appendChild(dayNameCell);
    }
    datePickerElement.appendChild(dayNamesRow);
    // replace with number of days in a month
    const days = 31;
    for (let i = 0; i < days.length; i++) {
      const weekRow = document.createElement("div");
      weekRow.className = "week-row";
      for (let j = 0; j < days[i].length; j++) {
        const dayCell = document.createElement("div");
        dayCell.textContent = days[i][j];
        dayCell.className = "day";
        if (days[i][j] !== "") {
          if (this.isCurrentMonthDay(i, j)) {
            dayCell.classList.add("current-month");
            // if (this.isCurrentMonthSelectedDay(i, j)) {
            //   dayCell.classList.add("selected");
            // }
          } else {
            dayCell.classList.add("other-month");
          }
        }
        weekRow.appendChild(dayCell);
      }
      datePickerElement.appendChild(weekRow);
    }
  }
}
