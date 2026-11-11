# Columns

The `columns` prop describes the table one column at a time.

<script setup>
import Columns from '../demos/Columns.vue'
</script>

<Demo><Columns /></Demo>

<<< @/demos/Columns.vue

## Column options

| Option | Type | Description |
| --- | --- | --- |
| `key` | `string` | **Required.** The property of the row shown in this column. |
| `label` | `string` | Header text. Defaults to the key. |
| `sortable` | `boolean` | Shows the sort arrows. See [Sorting](/guide/sorting). |
| `width` | `string` | Any CSS width, such as `"120px"` or `"20%"`. Columns share the width equally by default. |
| `align` | `"left" \| "center" \| "right"` | Alignment of the header and the cells. |
| `hidden` | `boolean` | Leaves the column out of the table and the CSV export. |
| `format` | `(value, row, index) => string \| number` | Returns the text of the cell. |
| `html` | `(value, row, index) => string` | Returns the HTML of the cell. See [Custom cells](/guide/custom-cells). |
| `sort` | `(a, b) => number` | Comparator for client-side sorting. |
| `class` | `string` | Class added to every cell of the column. |
| `headerClass` | `string` | Class added to the header cell. |

## The short form: `labels`

For a quick table you can pass `labels` instead of `columns`. Each label is matched to the row property with the same name. If there is none, labels are matched to the row properties by position.

```vue
<template>
  <VTable :labels="['name', 'category', 'price']" :data="products" />
</template>
```

`labels` cannot format, align or hide a column. Use `columns` for that. When both are set, `columns` wins.
