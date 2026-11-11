<template>
  <VTable :columns="columns" :data="products" clientSide :itemsPerPage="5" />
</template>

<script setup lang="ts">
import { VTable, type Column } from "v-table-system";
import { products } from "./data";

const columns: Column[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
];
</script>
