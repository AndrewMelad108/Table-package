<template>
  <VTable
    v-model:currentPage="page"
    :columns="columns"
    :data="rows"
    :loading="loading"
    :totalItems="total"
    :itemsPerPage="perPage"
    isShowSearch
    :searchDebounce="500"
    @changePage="load"
    @Search="onSearch"
    @SortBy="onSort"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VTable, type Column, type Row, type SortPayload } from "v-table-system";
import { products } from "./data";

const columns: Column[] = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "price", label: "Price", sortable: true },
];

const perPage = 5;
const page = ref(1);
const rows = ref<Row[]>([]);
const total = ref(0);
const loading = ref(false);
let search = "";
let sort: SortPayload | undefined;

// Stands in for your API, for example GET /products?page=2&search=mouse&sort=price
function fakeApi(): Promise<{ items: Row[]; total: number }> {
  let items = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
  if (sort) {
    const { key, direction } = sort;
    items = [...items].sort((a: Row, b: Row) => (a[key] > b[key] ? 1 : -1) * (direction === "asc" ? 1 : -1));
  }
  const start = (page.value - 1) * perPage;
  return new Promise((done) => setTimeout(() => done({ items: items.slice(start, start + perPage), total: items.length }), 400));
}

async function load() {
  loading.value = true;
  const result = await fakeApi();
  rows.value = result.items;
  total.value = result.total;
  loading.value = false;
}

function onSearch(value: string) {
  search = value;
  page.value = 1;
  load();
}

function onSort(payload: SortPayload) {
  sort = payload;
  load();
}

onMounted(load);
</script>
