<template>
  <VTable :columns="columns" :data="products" expandable rowKey="id" clientSide :itemsPerPage="5">
    <template #expand="{ row }">
      <strong>{{ row.name }}</strong> is in <em>{{ row.category }}</em>, {{ row.stock }} left in stock.
    </template>
  </VTable>
</template>

<script setup lang="ts">
import { VTable, type Column } from "v-table-system";
import { products } from "./data";

const columns: Column[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "price", label: "Price" },
];
</script>
