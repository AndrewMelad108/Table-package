<template>
  <VTable
    :columns="columns"
    :data="products"
    isShowSearch
    showFilterInputs
    :filtersOptions="['name', 'category', 'status']"
    clientSide
    :itemsPerPage="5"
    @Search="lastEvent = $event"
  />
  <p class="demo-log">Search: {{ lastEvent ?? "type in the search box" }}</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VTable, type Column, type SearchPayload } from "v-table-system";
import { products } from "./data";

const lastEvent = ref<string | SearchPayload>();

const columns: Column[] = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "status", label: "Status" },
];
</script>
