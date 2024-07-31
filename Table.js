class Table {
  constructor(headers, tableData) {
    this.headers = headers;
    this.tableData = tableData;
  }
  render() {
    let table = '<table style="width:100%; border-collapse: collapse;">';
    this.headers.forEach((row) => {
      table += "<tr>";
      row.forEach((cell) => {
        table += `<th>${cell}</th>`;
      });
      table += "</tr>";
    });
    this.tableData.forEach((row) => {
      table += "<tr>";
      row.forEach((cell) => {
        table += `<td >${cell}</td>`;
      });
      table += "</tr>";
    });
    table += "</table>";
    return table;
  }
}
export default Table;
