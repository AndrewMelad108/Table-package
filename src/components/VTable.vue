<template>
  <div class="Table overflow-auto bg-gray-100 m-4 p-4 rounded-md">
    <v-filter
      v-if="props.isShowSearch"
      :filterInputs="filterInputs"
      :showFilterInputs="showFilterInputs"
      :filtersOptions="
        filtersOptions && filtersOptions.length > 0 ? filtersOptions : []
      "
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
      class="shadow-md max-h-[100vh] pb-14 mt-4 overflow-x-auto shadow-gray-400 rounded-md max-w-[100%]"
    >
      <table class="md:w-full w-[600px] border-collapse">
        <tr class="sticky left-0 p-2 right-0">
          <th
            v-for="(title, index) in props.labels"
            :key="index"
            class="py-4 px-2 w-full text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400"
            :style="{ 'max-width': widthLabels }"
          >
            <div class="flex gap-[2px] min-h-6">
              <v-sort
                v-if="sortableColumns && sortableColumns.includes(title)"
                :title="title"
                @SortBy="$emit('SortBy', $event)"
                class="self-end"
              ></v-sort>
              <p class="text-xs self-end">
                {{ title }}
              </p>
            </div>
          </th>
        </tr>
        <tr
          class="odd:bg-gray-200 hover:bg-gray-300 even:bg-white cursor-pointer dark:bg-gray-800 dark:border-gray-700 transition ease-in-out delay-150 hover:-translate-y-1 duration-300"
          v-for="(item, index) in data"
          @click="$emit('selectRow', item)"
          :key="index"
        >
          <td
            :style="{ width: widthLabels }"
            class="p-3"
            v-for="(value, key) in item"
          >
            <span v-if="typeof key === 'string' && key !== 'actions'">
              {{ value }}
            </span>
            <div v-else class="flex gap-1">
              <button
                @click.passive.stop="btn.callback"
                :style="{ ...btn.style }"
                v-for="(btn, index) in value"
                :key="index"
                v-html="btn.tag"
              ></button>
            </div>
          </td>
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
import VSort from "./VSort.vue";
import "../style.css";
import { defineEmits, defineProps, ref, computed, type Ref } from "vue";
const emits = defineEmits([
  "Search",
  "changeFilterInput",
  "changePage",
  "SortBy",
  "selectRow",
]);
const props = defineProps([
  "loading",
  "totalPages",
  "filterInputs",
  "showFilterInputs",
  "isShowSearch",
  "filtersOptions",
  "currentPage",
  "itemsPerPage",
  "data",
  "labels",
  "sortableColumns",
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
</script>
<style scoped></style>
