<template>
  <div
    class="flex sm:flex-row flex-col flex-wrap sm:mt-0 mt-4 px-4 sm:items-baseline sm:justify-between"
  >
    <div class="text-sm sm:text-left text-center sm:order-2 order-2">
      Total: {{ props.totalPages && props.totalPages.toLocaleString("en") }}
    </div>
    <ul
      class="flex items-center sm:justify-start justify-center sm:justify-self-end space-x-1 rtl:space-x-reverse my-4 sm:order-2 order-1"
    >
      <li>
        <button
          type="button"
          class="flex justify-center font-semibold w-10 h-10 items-center rounded-full transition bg-gray-200 text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          <img
            src="../assets/icon.svg"
            class="h-3 rotate-180 cursor-pointer"
            alt="icon.svg"
          />
        </button>
      </li>

      <li
        v-for="page in [...Array(Math.min(2, totalPages)).keys()].map(
          (i) => i + 1
        )"
        :key="page"
      >
        <button
          type="button"
          class="flex justify-center items-center font-semibold h-10 w-10 rounded-full transition"
          :class="{
            'bg-primary text-white dark:bg-primary': page === currentPage,
            'bg-gray-200 text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary':
              page !== currentPage,
          }"
          @click="changePage(page)"
        >
          {{ page && page.toLocaleString("en") }}
        </button>
      </li>
      <li>...</li>
      <li
        v-for="page in [currentPage]"
        v-show="currentPage && currentPage > 2 && currentPage < totalPages - 1"
        :key="page"
      >
        <button
          type="button"
          class="flex justify-center font-semibold h-10 w-10 items-center rounded-full transition"
          :class="{
            'bg-primary text-white dark:bg-primary': page === currentPage,
            'bg-gray-200 text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary':
              page !== currentPage,
          }"
          @click="changePage(page)"
        >
          {{ page && page.toLocaleString("en") }}
        </button>
      </li>
      <li v-if="currentPage && currentPage > 2 && currentPage < totalPages - 1">
        ...
      </li>
      <li
        v-for="page in [...Array(Math.min(2, totalPages)).keys()].map(
          (i) => i + totalPages - 1
        )"
        v-show="totalPages > 2"
        :key="page"
      >
        <button
          type="button"
          class="flex justify-center items-center font-semibold w-10 h-10 rounded-full transition"
          :class="{
            'bg-primary text-white dark:bg-primary': page === currentPage,
            'bg-gray-200 text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary':
              page !== currentPage,
          }"
          @click="changePage(page)"
        >
          {{ page && page.toLocaleString("en") }}
        </button>
      </li>
      <li>
        <button
          type="button"
          class="flex justify-center font-semibold h-10 w-10 items-center rounded-full transition bg-gray-200 text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          <img src="../assets/icon.svg" class="h-3" alt="icon.svg" />
        </button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";
const emits = defineEmits(["changePage"]);
const props = defineProps(["totalPages", "currentPage", "itemsPerPage"]);
const prevPage = (): void => {
  if (props.currentPage && props.currentPage > 1)
    emits("changePage", props.currentPage - 1);
};
const nextPage = (): void => {
  if (props.currentPage && props.currentPage < (props.totalPages ?? 0))
    emits("changePage", props.currentPage + 1);
};
const changePage = (page: number): void => {
  emits("changePage", page);
};
</script>
