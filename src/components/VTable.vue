<template>
  <div class="Table overflow-x-auto">
    <v-filter
      v-if="props.showFilterInputs"
      :filterInputs="filterInputs"
      :showFilterInputs="true"
      @changeFilterInput="changeFilterInput"
      @search="$emit('Search', $event)"
    ></v-filter>
    <div
      v-if="props.loading"
      class="loader-spin flex justify-center items-center min-h-[300px]"
    >
      <span
        class="animate-[spin_0.35s_linear_infinite] block border-2 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-10 h-10"
      ></span>
    </div>
    <div
      v-else
      class="shadow-md h-auto pb-14 overflow-x-auto shadow-gray-400 max-w-[100%]"
    >
      <table class="w-full">
        <tr class="bg-black sticky left-0 right-0">
          <th
            v-for="(title, index) in props.labels"
            :key="index"
            class="py-4 bg-slate-100 px-8"
            :style="{ width: widthLabels }"
          >
            <p>{{ title }}</p>
          </th>
        </tr>
        <tr v-for="(item, index) in data" :key="index">
          <td class="text-center" v-for="(value, key) in item">{{ value }}</td>
        </tr>
      </table>
      <div
        v-show="props.data.length <= 0"
        class="not-data w-full min-h-[300px] text-center flex items-center justify-center font-bold text-md"
      >
        No data available
      </div>
    </div>
    <v-pagination
      :itemsPerPage="itemsPerPage"
      :totalPages="totalPages"
      :currentPage="currentPage"
      @changePage="$emit('changePage', $event)"
    ></v-pagination>
  </div>
</template>
<script lang="ts" setup>
import VPagination from "./VPagination.vue";
import VFilter from "./VFilter.vue";
import { defineEmits, defineProps, ref, computed, type Ref } from "vue";
const emits = defineEmits([
  "Search",
  "changeFilterInput",
  "changePage",
  "SortBy",
]);
const props = defineProps([
  "loading",
  "totalPages",
  "filterInputs",
  "showFilterInputs",
  "currentPage",
  "itemsPerPage",
  "data",
  "labels",
]) as any;
const changeFilterInput = (inputsArray: any) => {
  emits("changeFilterInput", inputsArray);
};
const widthLabels = computed(() => {
  return 100 / props.labels.length + "%";
});
const totalPages = computed(() =>
  Math.ceil((props.totalPages ?? 1) / (props.itemsPerPage ?? 1))
);

const SortBy = (title: any, sortValue: any) => {
  emits("SortBy", {
    title: title.split(" ").join("_"),
    sortValue: sortValue,
  });
};
</script>
