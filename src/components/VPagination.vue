<template>
  <div class="flex sm:flex-row flex-col flex-wrap sm:mt-0 mt-4 px-4 sm:items-baseline sm:justify-between">
    <div class="flex items-center sm:justify-start justify-center gap-4 text-sm sm:order-1 order-2">
      <span>{{ texts.total }}: {{ (totalItems ?? 0).toLocaleString("en") }}</span>
      <label v-if="pageSizeOptions && pageSizeOptions.length" class="flex items-center gap-2">
        {{ texts.rowsPerPage }}
        <select class="h-8 px-2 rounded border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600" :value="itemsPerPage" @change="emits('changePageSize', Number(($event.target as HTMLSelectElement).value))">
          <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size }}</option>
        </select>
      </label>
    </div>
    <ul class="flex items-center sm:justify-start justify-center sm:justify-self-end space-x-1 rtl:space-x-reverse my-4 sm:order-2 order-1">
      <li>
        <button type="button" aria-label="Previous page" class="flex justify-center font-semibold w-10 h-10 items-center rounded-full transition bg-gray-200 text-dark hover:text-white hover:bg-primary disabled:opacity-50 dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
          :disabled="currentPage <= 1" @click="changePage(currentPage - 1)">
          <img src="../assets/icon.svg" class="h-3 rotate-180 rtl:rotate-0 dark:invert" alt="" />
        </button>
      </li>

      <template v-for="(page, index) in pages" :key="index">
        <li v-if="page === '...'">...</li>
        <li v-else>
          <button type="button" class="flex justify-center items-center font-semibold h-10 w-10 rounded-full transition"
            :class="{
              'bg-primary text-white dark:bg-primary': page === currentPage,
              'bg-gray-200 text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary':
                page !== currentPage,
            }"
            :aria-current="page === currentPage ? 'page' : undefined"
            @click="changePage(page)">
            {{ page.toLocaleString("en") }}
          </button>
        </li>
      </template>
      <li>
        <button type="button" aria-label="Next page" class="flex justify-center font-semibold h-10 w-10 items-center rounded-full transition bg-gray-200 text-dark hover:text-white hover:bg-primary disabled:opacity-50 dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
          :disabled="currentPage >= totalPages" @click="changePage(currentPage + 1)">
          <img src="../assets/icon.svg" class="h-3 rtl:rotate-180 dark:invert" alt="" />
        </button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
// Import Vue Files
import { computed } from "vue";
import type { TableTexts } from "../types";

//Props and Emits
const emits = defineEmits<{
  (e: "changePage", page: number): void;
  (e: "changePageSize", size: number): void;
}>();
const props = defineProps<{
  /** Number of pages */
  totalPages: number;
  currentPage: number;
  totalItems?: number;
  itemsPerPage?: number;
  pageSizeOptions?: number[];
  texts: TableTexts;
}>();

// Pages to show: all of them when few, otherwise first two, current and last two
const pages = computed<(number | "...")[]>(() => {
  const total = props.totalPages;
  const current = props.currentPage;
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const middle: (number | "...")[] = current > 2 && current < total - 1 ? [current, "..."] : [];
  return [1, 2, "...", ...middle, total - 1, total];
});

// Functions
const changePage = (page: number): void => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) emits("changePage", page);
};
</script>
