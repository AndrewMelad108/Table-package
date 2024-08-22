<template>
  <VTable
    :labels="labels"
    :data="data"
    :totalPages="150"
    :showFilterInputs="true"
    :currentPage="currentPage"
    @Search="Search"
    @changePage="changePage"
  ></VTable>
</template>
<script setup>
import { ref } from "vue";
import VTable from "./components/VTable.vue";
const labels = ref(["name", "description", "actions"]);
const currentPage = ref(1);
const data = ref([{ name: "asd", description: "asd", actions: "as" }]);
const changePage = (obj) => {
  console.log(obj);

  currentPage.value = obj.value;
};
const Search = (obj) => {
  console.log(obj);
};
</script>
<style scoped></style>
