<template>
  <VTable ref="table" :columns="columns" :data="products" exportable exportFileName="products" clientSide :itemsPerPage="5" />
  <p class="demo-log">
    <button type="button" @click="table?.exportCsv('my-file')">Export from my own button</button>
  </p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VTable, type Column } from "v-table-system";
import { products } from "./data";

const table = ref<InstanceType<typeof VTable>>();

const columns: Column[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "price", label: "Price", format: (value) => `$${value}` },
];
</script>
