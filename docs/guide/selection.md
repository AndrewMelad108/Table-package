# Row selection

`selectable` adds a checkbox to every row and one in the header that selects the whole page. Bind the selected rows with `v-model:selected`.

<script setup>
import Selection from '../demos/Selection.vue'
</script>

<Demo><Selection /></Demo>

<<< @/demos/Selection.vue

## Set a `rowKey`

`rowKey` tells the table how to recognise a row. It is the name of a unique property, or a function that returns a unique value:

```vue
<VTable selectable rowKey="id" ... />
<VTable selectable :rowKey="(row) => `${row.type}-${row.code}`" ... />
```

Without it rows are compared by object identity. That is fine for a fixed array, but a selection is lost as soon as the rows are loaded again, which is what happens on every page change of a server-side table.

## Events and methods

| | |
| --- | --- |
| `update:selected` / `selectionChange` | Both fire with the array of selected rows whenever it changes. |
| `clearSelection()` | Method on the component that empties the selection. |
| `#toolbar` slot | A place for your own buttons next to the selection count. It receives `rows` and `selected`. |

## Clicking a row

Separately from the checkboxes, every row click emits `selectRow` with the row. Use it to open a details page, for example.

```vue
<VTable @selectRow="(row) => router.push(`/products/${row.id}`)" ... />
```
