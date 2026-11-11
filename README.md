# v-table-system

A data table for **Vue 3** that also ships as a **web component**, so it works in React, Angular, Svelte or a plain HTML page.

- Column definitions with formatters, alignment and widths
- Sorting, search with a field filter, pagination with page sizes
- Client-side mode (the table does the work) or server-side mode (your API does)
- Row selection, expandable rows, row actions
- CSV export
- Slots for every cell and header
- Dark mode, right-to-left, translated texts

## Installation

```bash
npm install v-table-system
```

## Usage in Vue

```vue
<template>
  <VTable :columns="columns" :data="products" clientSide isShowSearch selectable rowKey="id" :pageSizeOptions="[10, 25, 50]" />
</template>

<script setup lang="ts">
import { VTable, type Column } from "v-table-system";

const columns: Column[] = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "price", label: "Price", align: "right", format: (value) => `$${value}` },
];

const products = [
  { id: 1, name: "Keyboard", price: 49 },
  { id: 2, name: "Mouse", price: 19 },
];
</script>
```

With `clientSide` the table searches, sorts and paginates `data` itself. Without it, pass one page of rows plus `totalItems` and `itemsPerPage`, and reload on the `changePage`, `Search` and `SortBy` events.

## Usage in any other framework

```html
<v-table-system id="table" client-side is-show-search row-key="id"></v-table-system>

<script src="https://unpkg.com/v-table-system/dist/v-table-system.element.iife.js"></script>
<script>
  const table = document.getElementById("table");
  table.columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
  ];
  table.data = [
    { id: 1, name: "Keyboard" },
    { id: 2, name: "Mouse" },
  ];
  table.addEventListener("changePage", (event) => console.log(event.detail[0]));
</script>
```

With a bundler, `import "v-table-system/element"` registers the same `<v-table-system>` tag.

## Documentation

The full guide, live examples, framework guides (React, Angular, Svelte) and the API reference are in the `docs` folder:

```bash
npm run docs:dev      # run the docs site locally
npm run docs:build    # build it into docs/.vitepress/dist
```

## Development

```bash
npm install
npm run build   # Vue component, web component and type declarations into dist
npm test        # type check
```

## License

Apache-2.0
