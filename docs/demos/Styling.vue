<template>
  <div class="demo-options">
    <label v-for="(_, name) in options" :key="name"><input v-model="options[name]" type="checkbox" /> {{ name }}</label>
  </div>
  <div :dir="options.rtl ? 'rtl' : 'ltr'">
    <VTable
      :columns="columns"
      :data="products"
      :striped="options.striped"
      :hoverable="options.hoverable"
      :bordered="options.bordered"
      :dense="options.dense"
      :stickyHeader="options.stickyHeader"
      :maxHeight="options.stickyHeader ? '260px' : undefined"
      :rowClass="(row) => (row.stock === 0 ? 'out-of-stock' : '')"
      :texts="{ total: 'Products', rowsPerPage: 'Per page' }"
      :pageSizeOptions="[10, 20]"
      clientSide
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { VTable, type Column } from "v-table-system";
import { products } from "./data";

const options = reactive({ striped: true, hoverable: true, bordered: false, dense: false, stickyHeader: false, rtl: false });

const columns: Column[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "stock", label: "Stock" },
];
</script>

<style>
.out-of-stock {
  color: #e7515a;
}
</style>
