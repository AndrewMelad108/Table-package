<template>
  <div class="Table overflow-x-auto px-2 bg-gray-100 p-4">
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
      class="shadow-md h-auto pb-14 mt-4 overflow-x-auto shadow-gray-400 max-w-[100%]"
    >
      <table class="w-full min-h-full">
        <tr class="sticky left-0 p-2 right-0">
          <th
            v-for="(title, index) in props.labels"
            :key="index"
            class="text-xs py-4 px-2 w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            :style="{ width: widthLabels }"
          >
            <div class="flex items-center gap-4">
              <p>
                {{ title }}
              </p>
              <div
                v-if="sortableColumns && sortableColumns.includes(title)"
                class="sort-column flex flex-col gap-2"
              >
                <span
                  @click="SortBy(title, 'asc')"
                  class="-rotate-90 cursor-pointer hover:opacity-5"
                  ><img
                    src="../assets/icon.svg"
                    alt="icom-svg"
                    class="w-auto h-2"
                /></span>
                <span
                  @click="SortBy(title, 'desc')"
                  class="rotate-90 cursor-pointer hover:opacity-5"
                  ><img
                    src="../assets/icon.svg"
                    alt="icom-svg"
                    class="w-auto h-2"
                /></span>
              </div>
            </div>
          </th>
        </tr>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="(item, index) in data"
          :key="index"
        >
          <td
            :style="{ width: widthLabels }"
            class="p-2"
            v-for="(value, key) in item"
          >
            <span v-if="typeof key === 'string' && key !== 'actions'">
              {{ value }}
            </span>
            <div v-else class="flex gap-1">
              <button
                @click="btn.callback"
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
import "../style.css";
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

const SortBy = (title: string, direction: string) => {
  emits("SortBy", {
    title: title,
    direction: direction,
  });
};
</script>
<style scoped></style>
