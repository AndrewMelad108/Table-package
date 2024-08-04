class VTable extends HTMLElement {
  constructor() {
    super();
    this.headers = [];
    this.tableData = [];
  }

  connectedCallback() {
    const headersAttr = this.getAttribute("table-header");
    const tableDataAttr = this.getAttribute("table-data");
    this.headers = headersAttr ? JSON.parse(headersAttr) : [];
    this.tableData = tableDataAttr ? JSON.parse(tableDataAttr) : [];

    this.render();
  }

  render() {
    let table = '<table style="width:100%; border-collapse: collapse;">';

    if (this.headers.length > 0) {
      table += "<tr>";
      this.headers.forEach((cell) => {
        table += `<th>${cell}</th>`;
      });
      table += "</tr>";
    }

    this.tableData.forEach((row) => {
      table += "<tr>";
      row.forEach((cell) => {
        table += `<td>${cell}</td>`;
      });
      table += "</tr>";
    });

    table += "</table>";
    this.innerHTML = table;
  }
}

customElements.define("v-table", VTable);

export default VTable;
