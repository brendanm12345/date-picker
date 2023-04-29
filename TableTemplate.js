"use strict";

class TableTemplate {
  static fillIn(id, dict, columnName) {
    const table = document.getElementById(id);
    const header = table.rows.item(0);
    const newHeader = new Cs142TemplateProcessor(header.innerHTML).fillIn(dict);
    header.innerHTML = newHeader;

    var cols = [];
    // if colName undefined, process all the columns, otherwise just process the one
    if (columnName === undefined) {
      cols = Array.from(Array(header.cells.length).keys());
    } else {
      let i = 0;
      while (table.rows[0].cells[i]) {
        if (header.cells[i].innerHTML === columnName) {
          cols = [i];
        }
        i++;
      }
    }
    // iterate through the columns that we need to process
    let i = 1;
    while (table.rows[i]) {
      for (let j = 0; j < cols.length; j++) {
        const cell = table.rows[i].cells[cols[j]];
        cell.innerHTML = new Cs142TemplateProcessor(cell.innerHTML).fillIn(
          dict
        );
      }
      i++;
    }
    if (table.style.visibility === "hidden") {
      table.style.visibility = "visible";
    }
  }
}
