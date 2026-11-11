# Vue

In Vue 3, use the `VTable` component. It supports slots, `v-model` and template refs, which the web component does not.

```bash
npm install v-table-system
```

Vue 3.4 or newer is required.

```vue
<template>
  <VTable
    v-model:selected="selected"
    :columns="columns"
    :data="products"
    clientSide
    selectable
    isShowSearch
    rowKey="id"
    :itemsPerPage="10"
  >
    <template #cell-name="{ value }">
      <strong>{{ value }}</strong>
    </template>
  </VTable>

  <p>{{ selected.length }} selected</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VTable, type Column, type Row } from "v-table-system";

const selected = ref<Row[]>([]);

const columns: Column[] = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "price", label: "Price", format: (value) => `$${value}` },
];

const products = [
  { id: 1, name: "Keyboard", price: 49 },
  { id: 2, name: "Mouse", price: 19 },
];
</script>
```

The styles come with the component. There is no CSS file to import.

Every feature is described in the [guide](/guide/getting-started), with a live example on each page.

## Register it once for the whole app

```ts
// main.ts
import { createApp } from "vue";
import { VTable } from "v-table-system";
import App from "./App.vue";

createApp(App).component("VTable", VTable).mount("#app");
```

## Nuxt

Import and use `VTable` the same way. The component renders on the server, but its styles are added in the browser, so the table shows without styles for a moment. Wrap it in `<ClientOnly>` to render it in the browser only:

```vue
<template>
  <ClientOnly>
    <VTable :columns="columns" :data="products" clientSide />
  </ClientOnly>
</template>
```
