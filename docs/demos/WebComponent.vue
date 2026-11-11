<template>
  <v-table-system ref="table" client-side selectable exportable is-show-search row-key="id" items-per-page="5"></v-table-system>
  <p class="demo-log">{{ message }}</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { products } from "./data";

const table = ref<any>();
const message = ref("Select a row");

onMounted(async () => {
  // Registers the <v-table-system> element
  await import("v-table-system/element");

  const element = table.value;
  element.columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "price", label: "Price", sortable: true, format: (value: number) => `$${value}` },
    { key: "status", label: "Status", html: (value: string) => `<b>${value}</b>` },
  ];
  element.data = products;
  element.addEventListener("selectionChange", (event: CustomEvent) => {
    message.value = `${event.detail[0].length} rows selected`;
  });
});
</script>
