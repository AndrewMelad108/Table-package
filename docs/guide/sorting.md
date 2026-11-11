# Sorting

Set `sortable: true` on a column to show its sort arrows. Clicking one emits `SortBy`.

<script setup>
import Sorting from '../demos/Sorting.vue'
</script>

<Demo><Sorting /></Demo>

<<< @/demos/Sorting.vue

## How rows are compared

With `clientSide` the table sorts the rows itself:

- numbers are compared as numbers
- everything else is compared as text, ignoring case, with numbers inside the text in natural order (`Item 2` before `Item 10`)
- empty values go last

Give a column its own `sort` function when that is not what you need.

## Starting order

`defaultSort` sets the column and direction the table starts with:

```vue
<VTable :defaultSort="{ key: 'price', direction: 'desc' }" ... />
```

## The `SortBy` event

```ts
{
  key: "price",        // the column key
  direction: "desc",   // "asc" or "desc"
  title: "price"       // the column key, or the label when the table uses `labels`
}
```

Without `clientSide` the table only highlights the active arrow. Sorting the rows is up to you, see [Server-side data](/guide/server-side).

::: tip sortableColumns
`sortableColumns` is the older way to mark columns as sortable. It is a list of column keys, or a list of labels when the table uses `labels`. It still works.
:::
