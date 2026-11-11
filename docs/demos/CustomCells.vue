<template>
  <VTable :columns="columns" :data="rows" clientSide :itemsPerPage="5" @selectRow="message = `Row clicked: ${$event.name}`">
    <!-- A slot per column: cell-<key> -->
    <template #cell-status="{ value }">
      <span :style="{ color: value === 'active' ? '#00ab55' : '#e2a03f', fontWeight: 600 }">● {{ value }}</span>
    </template>

    <!-- The header has one too: header-<key> -->
    <template #header-price>Price (USD)</template>

    <template #empty>Nothing to show yet</template>
  </VTable>
  <p class="demo-log">{{ message }}</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VTable, type Column } from "v-table-system";
import { products } from "./data";

const message = ref("Click a row or a button");

const columns: Column[] = [
  { key: "name", label: "Name" },
  { key: "price", label: "Price", format: (value) => `$${value}` },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" },
];

// A row property called "actions" is rendered as buttons
const rows = products.map((product) => ({
  ...product,
  actions: [
    {
      tag: "Edit",
      style: { color: "#4361ee", fontWeight: "600" },
      callback: () => (message.value = `Edit ${product.name}`),
    },
    {
      tag: "Delete",
      style: { color: "#e7515a", fontWeight: "600" },
      callback: () => (message.value = `Delete ${product.name}`),
    },
  ],
}));
</script>
