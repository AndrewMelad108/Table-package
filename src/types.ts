export type Row = Record<string, any>;

export type SortDirection = "asc" | "desc";

export interface Column {
  /** Property of the row object shown in this column */
  key: string;
  /** Header text, defaults to the key */
  label?: string;
  sortable?: boolean;
  /** Any CSS width, for example "120px" or "20%" */
  width?: string;
  align?: "left" | "center" | "right";
  hidden?: boolean;
  /** Returns the text shown in the cell */
  format?: (value: any, row: Row, index: number) => string | number;
  /** Returns an HTML string shown in the cell. Only use it with trusted content */
  html?: (value: any, row: Row, index: number) => string;
  /** Custom comparator used by client-side sorting */
  sort?: (a: Row, b: Row) => number;
  class?: string;
  headerClass?: string;
}

export interface RowAction {
  /** HTML string rendered inside the button */
  tag: string;
  style?: Record<string, string>;
  callback?: (event: Event, row: Row) => void;
}

export interface SortState {
  key: string;
  direction: SortDirection;
}

export interface SortPayload extends SortState {
  /** The column label when `labels` is used, the column key when `columns` is used */
  title: string;
}

export interface SearchPayload {
  keySearch: string;
  inputValue: string;
}

export interface TableTexts {
  total: string;
  search: string;
  filterPlaceholder: string;
  noData: string;
  rowsPerPage: string;
  exportCsv: string;
  selected: string;
}

export const defaultTexts: TableTexts = {
  total: "Total",
  search: "Search ...",
  filterPlaceholder: "Select filter value",
  noData: "No data available",
  rowsPerPage: "Rows per page",
  exportCsv: "Export CSV",
  selected: "selected",
};
