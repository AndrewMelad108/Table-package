# Upgrading from 0.0.x

Version 0.1 keeps the props and events of 0.0.x. A table written for 0.0.x keeps working, with the changes below.

## Changes in behaviour

| Area | 0.0.x | 0.1 |
| --- | --- | --- |
| Pagination total | `Total:` showed the number of pages. | Shows the number of rows, the value of `totalItems` / `totalPages`. |
| Page buttons | Could repeat a page and always showed `...`. | Shows every page up to 5, then first two, current and last two. |
| Filter dropdown | Changing it did nothing until the user typed. | Emits `Search` right away. |
| Clicking the active page | Emitted `changePage` again. | Emits nothing. |
| Page styles | A full CSS reset was applied to the whole page. | Styles only touch the table. If your page relied on that reset, add your own. |
| Columns with `labels` | Cells followed the order of the row properties. | Labels that match a row property show that property. Others still go by position. |
| Action `callback` | Received the click event. | Receives the click event, then the row. |
| `SortBy` payload | `{ title, direction }` | `{ title, direction, key }` |

## Package

- `import { VTable } from "v-table-system"` now resolves correctly in both ES module and CommonJS projects, and ships its TypeScript types.
- Vue is a peer dependency (`^3.4.0`).
- New entry `v-table-system/element` registers the [web component](/frameworks/).

## New names

Nothing was removed, but two props have clearer replacements:

| Old | New |
| --- | --- |
| `totalPages` | `totalItems` |
| `labels` + `sortableColumns` | `columns` with `sortable: true` |
