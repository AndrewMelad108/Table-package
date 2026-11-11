<template>
  <VTable :columns="columns" :data="products" clientSide :itemsPerPage="5" />
</template>

<script setup lang="ts">
import { VTable, type Column } from "v-table-system";
import { products } from "./data";

const columns: Column[] = [
  { key: "id", label: "#", width: "60px", align: "center" },
  { key: "name", label: "Product" },
  { key: "price", label: "Price", align: "right", format: (value) => `$${value.toFixed(2)}` },
  { key: "stock", label: "In stock", align: "right", format: (value) => (value ? value : "Sold out") },
  // Hidden columns are not rendered and not exported
  { key: "category", label: "Category", hidden: true },
];
</script>
