# Pagination

The pagination bar shows the total number of rows, the page buttons and, with `pageSizeOptions`, a page size dropdown.

<script setup>
import Pagination from '../demos/Pagination.vue'
</script>

<Demo><Pagination /></Demo>

<<< @/demos/Pagination.vue

## Props

| Prop | Description |
| --- | --- |
| `currentPage` | The active page, starting at 1. Works with `v-model:currentPage`. |
| `itemsPerPage` | Rows per page. Works with `v-model:itemsPerPage`. |
| `pageSizeOptions` | Sizes offered in the dropdown, for example `[10, 25, 50]`. No dropdown when left out. |
| `totalItems` | Total number of rows on the server. Not needed with `clientSide`. |
| `showPagination` | Set to `false` to hide the bar. With `clientSide` all rows are then shown. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `changePage` | page number | The user picks another page. |
| `changeItemsPerPage` | page size | The user picks another page size. The table also goes back to page 1. |

::: warning Set itemsPerPage for server-side tables
Without `clientSide`, `itemsPerPage` defaults to `1`, so the number of pages equals `totalItems`. Always pass `itemsPerPage` together with `totalItems`.

With `clientSide` it defaults to the first entry of `pageSizeOptions`, or `10`.
:::

::: tip totalPages
`totalPages` is the old name of `totalItems`. Despite its name it has always been the number of rows, not pages. It still works.
:::
