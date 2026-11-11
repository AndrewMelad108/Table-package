# Expandable rows

`expandable` adds a button to every row that opens a details area below it. Fill that area with the `expand` slot.

<script setup>
import Expand from '../demos/Expand.vue'
</script>

<Demo><Expand /></Demo>

<<< @/demos/Expand.vue

The slot receives `row` and `index`. Opening or closing a row emits `expandChange` with `{ row, expanded }`, a good moment to load the details.

Set a [`rowKey`](/guide/selection#set-a-rowkey) so rows stay open when the data is loaded again.

## Without a slot

The web component has no slots. Use `expandRender` there, a function that returns the HTML of the details area:

```js
table.expandRender = (row) => `<strong>${row.name}</strong> has ${row.stock} left`;
```

::: warning
`expandRender` output is inserted as HTML. Escape anything that comes from users.
:::
