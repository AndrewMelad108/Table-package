# Server-side data

For large data sets, keep the work on the server. Leave `clientSide` out, pass the rows of the current page, and reload them when the table emits an event.

<script setup>
import ServerSide from '../demos/ServerSide.vue'
</script>

<Demo><ServerSide /></Demo>

<<< @/demos/ServerSide.vue

## Checklist

1. `data` holds only the current page.
2. `totalItems` and `itemsPerPage` tell the table how many pages there are.
3. `loading` shows a spinner while a request is running.
4. On `changePage`, `Search`, `SortBy` and `changeItemsPerPage`, call your API again.
5. On `Search` and `changeItemsPerPage`, go back to page 1.
6. With [row selection](/guide/selection), set a `rowKey` so the selection survives a reload.

## What each event gives you

| Event | Payload | Typical query parameter |
| --- | --- | --- |
| `changePage` | `2` | `?page=2` |
| `changeItemsPerPage` | `25` | `?per_page=25` |
| `Search` | `"mouse"` or `{ keySearch, inputValue }` | `?search=mouse` |
| `SortBy` | `{ key, direction, title }` | `?sort=price&order=desc` |
