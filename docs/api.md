# API reference

The same options apply to the Vue component `VTable` and to the [web component](/frameworks/) `<v-table-system>`.

## Props

### Data

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `Row[]` | `[]` | The rows. Every row with `clientSide`, the current page without it. |
| `columns` | `Column[]` | | [Column definitions](/guide/columns). |
| `labels` | `string[]` | | Short form of `columns`. Ignored when `columns` is set. |
| `clientSide` | `boolean` | `false` | The table searches, sorts and paginates `data` itself. |
| `loading` | `boolean` | `false` | Shows a spinner instead of the rows. |
| `rowKey` | `string \| (row) => unknown` | | Unique property of a row, or a function returning a unique value. |

### Sorting

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultSort` | `{ key, direction }` | | The sort the table starts with. |
| `sortableColumns` | `string[]` | | Keys (or labels, with `labels`) of sortable columns. Prefer `sortable` on the column. |

### Search

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isShowSearch` | `boolean` | `false` | Shows the search box. |
| `showFilterInputs` | `boolean` | `false` | Shows the field dropdown next to the search box. |
| `filtersOptions` | `string[]` | `[]` | Options of the dropdown. |
| `searchDebounce` | `number` | `1000`, or `300` with `clientSide` | Milliseconds to wait after typing. |

### Pagination

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `showPagination` | `boolean` | `true` | Shows the pagination bar. |
| `currentPage` | `number` | `1` | The active page. Supports `v-model:currentPage`. |
| `itemsPerPage` | `number` | `1`, or `10` with `clientSide` | Rows per page. Supports `v-model:itemsPerPage`. |
| `pageSizeOptions` | `number[]` | | Shows a page size dropdown with these sizes. |
| `totalItems` | `number` | | Number of rows on the server. Not used with `clientSide`. |
| `totalPages` | `number` | | Old name of `totalItems`. |

### Selection and expansion

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `selectable` | `boolean` | `false` | Shows the row checkboxes. |
| `selected` | `Row[]` | `[]` | The selected rows. Supports `v-model:selected`. |
| `expandable` | `boolean` | `false` | Shows the expand button on every row. |
| `expandRender` | `(row, index) => string` | | HTML of an expanded row, when the `expand` slot is not used. |

### Export

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `exportable` | `boolean` | `false` | Shows the Export CSV button. |
| `exportFileName` | `string` | `"table"` | File name of the download, without `.csv`. |

### Appearance

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `striped` | `boolean` | `true` | Alternating row colours. |
| `hoverable` | `boolean` | `true` | Highlights the hovered row. |
| `bordered` | `boolean` | `false` | Borders around every cell. |
| `dense` | `boolean` | `false` | Compact rows. |
| `stickyHeader` | `boolean` | `false` | Header stays visible while scrolling. |
| `maxHeight` | `string` | | CSS height of the scrolling area. |
| `rowClass` | `string \| (row, index) => string` | | Class added to rows. |
| `texts` | `Partial<TableTexts>` | | [Replaces the built-in texts](/guide/styling#texts). |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `changePage` | `number` | The user chose another page. |
| `changeItemsPerPage` | `number` | The user chose another page size. |
| `Search` | `string \| SearchPayload` | The search text or the field dropdown changed. |
| `SortBy` | `SortPayload` | A sort arrow was clicked. |
| `selectRow` | `Row` | A row was clicked. |
| `selectionChange` | `Row[]` | The checkbox selection changed. |
| `expandChange` | `{ row, expanded }` | A row was opened or closed. |
| `update:currentPage`, `update:itemsPerPage`, `update:selected` | | Used by `v-model`. |

In the web component the payload is `event.detail[0]`.

## Slots

Vue component only.

| Slot | Props | Description |
| --- | --- | --- |
| `cell-<key>` | `row`, `value`, `index`, `column` | A cell of the column `<key>`. |
| `header-<key>` | `column` | The header of the column `<key>`. |
| `expand` | `row`, `index` | The details of an expanded row. |
| `toolbar` | `rows`, `selected` | Extra content above the table. |
| `empty` | | Shown when there are no rows. |
| `loading` | | Replaces the spinner. |

## Methods

Available through a template ref on the Vue component, and directly on the web component.

| Method | Description |
| --- | --- |
| `exportCsv(fileName?: string)` | Downloads the rows as a CSV file. |
| `clearSelection()` | Empties the checkbox selection. |

## Types

All types are exported from `v-table-system`.

```ts
import type { Column, Row, RowAction, SearchPayload, SortPayload, SortState, TableTexts } from "v-table-system";
```

```ts
type Row = Record<string, any>;

type SortDirection = "asc" | "desc";

interface Column {
  key: string;
  label?: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  hidden?: boolean;
  format?: (value: any, row: Row, index: number) => string | number;
  html?: (value: any, row: Row, index: number) => string;
  sort?: (a: Row, b: Row) => number;
  class?: string;
  headerClass?: string;
}

interface RowAction {
  tag: string;
  style?: Record<string, string>;
  callback?: (event: Event, row: Row) => void;
}

interface SortState {
  key: string;
  direction: SortDirection;
}

interface SortPayload extends SortState {
  title: string;
}

interface SearchPayload {
  keySearch: string;
  inputValue: string;
}

interface TableTexts {
  total: string;
  search: string;
  filterPlaceholder: string;
  noData: string;
  rowsPerPage: string;
  exportCsv: string;
  selected: string;
}
```
