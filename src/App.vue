<template>
  <VTable
    :labels="labels"
    :data="data"
    :currentPage="currentPage"
    :totalPages="150"
    :showFilterInputs="true"
    :isShowSearch="true"
    :filtersOptions="filtersOptions"
    @Search="Search"
    @changePage="changePage"
  ></VTable>
</template>
<script setup lang="ts">
import { ref } from "vue";
import VTable from "./components/VTable.vue";
const labels = ref(["name", "description", "actions"]);
const currentPage = ref(1);
const data = ref([
  {
    name: "asd",
    description: "asd",
    actions: [
      {
        tag: "<img src='./assets/icons8-done.gif' />",
        style: {},
        callback: () => {
          return console.log("add success");
        },
      },
      {
        tag: "<p>edit</p>",
        style: {},
        callback: () => {
          return console.log("edit success");
        },
      },
    ],
  },
]);
const filtersOptions = ref([
  "Select  value",
  "diagnosis",
  "referred ",
  "diagnosed ",
  "number",
]);
const changePage = (page) => {
  console.log(page);
  currentPage.value = page;
};
const Search = (obj) => {
  console.log(obj);
};
</script>
