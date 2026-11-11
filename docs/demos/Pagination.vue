<template>
  <VTable
    v-model:currentPage="page"
    v-model:itemsPerPage="size"
    :columns="columns"
    :data="products"
    :pageSizeOptions="[5, 10, 25]"
    clientSide
  />
  <p class="demo-log">page {{ page }}, {{ size }} rows per page</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VTable, type Column } from "v-table-system";
import { products } from "./data";

const page = ref(1);
const size = ref(5);

const columns: Column[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
];
</script>
