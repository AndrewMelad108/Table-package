<template>
  <VTable
    ref="table"
    v-model:selected="selected"
    :columns="columns"
    :data="products"
    selectable
    rowKey="id"
    clientSide
    :itemsPerPage="5"
  >
    <template #toolbar>
      <button type="button" @click="table?.clearSelection()">Clear</button>
    </template>
  </VTable>
  <p class="demo-log">Selected ids: {{ selected.map((row) => row.id).join(", ") || "none" }}</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VTable, type Column, type Row } from "v-table-system";
import { products } from "./data";

const table = ref<InstanceType<typeof VTable>>();
const selected = ref<Row[]>([]);

const columns: Column[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
];
</script>
