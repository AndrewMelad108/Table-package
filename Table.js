class VTable extends HTMLElement {
  constructor() {
    super();
    this.headers = null;
    this.tableData = null;
  }
  connectedCallback() {
    this.headers = this.getAttribute("headers");
    this.tableData = this.getAttribute("tableData");
    this.render();
  }
  render() {
    this.innerHTML = '<table style="width:100%; border-collapse: collapse;">';
    table += "<tr>";
    this.headers.forEach((cell) => {
      table += `<th>${cell}</th>`;
    });
    table += "</tr>";
    table += "<tr>";
    this.tableData.forEach((cell) => {
      table += `<td >${cell}</td>`;
    });
    table += "</tr>";
    table += "</table>";
  }
}
customElements.define("v-table", VTable);
