<template>
  <VTable
    :columns="columns"
    :data="products"
    :defaultSort="{ key: 'price', direction: 'desc' }"
    clientSide
    :itemsPerPage="5"
    @SortBy="lastEvent = $event"
  />
  <p class="demo-log">SortBy: {{ lastEvent ?? "click an arrow" }}</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VTable, type Column, type SortPayload } from "v-table-system";
import { products } from "./data";

const lastEvent = ref<SortPayload>();

const columns: Column[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "price", label: "Price", sortable: true },
  // A custom comparator: drafts first
  { key: "status", label: "Status", sortable: true, sort: (a, b) => a.status.localeCompare(b.status) * -1 },
  { key: "category", label: "Category" },
];
</script>
