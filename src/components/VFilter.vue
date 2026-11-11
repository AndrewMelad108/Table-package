<template>
  <div class="filter-inputs w-full p-4 bg-slate-50 dark:bg-gray-800 rounded-md shadow-md">
    <div class="search-input grid sm:gap-6 gap-4 sm:grid-cols-3 grid-cols-1">
      <multiselect
        v-if="props.showFilterInputs"
        v-model="filterValue"
        :options="options"
        class="custom-multiselect"
        :searchable="false"
        :preselect-first="true"
        :allow-empty="false"
        :placeholder="texts.filterPlaceholder"
        selected-label=""
        select-label=""
        deselect-label=""
      ></multiselect>
      <input
        v-model="search"
        type="text"
        class="form-input text-primary bg-white border border-gray-300 rounded focus:outline-0 h-10 p-2 dark:bg-gray-900 dark:border-gray-600"
        :class="props.showFilterInputs ? 'md:col-start-2 md:col-end-4' : 'col-start-1 col-end-2'"
        :placeholder="texts.search"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
// Import Vue Files
import { watch, computed, ref, type Ref } from "vue";
import Multiselect from "@suadelabs/vue3-multiselect";
import "@suadelabs/vue3-multiselect/dist/vue3-multiselect.css";
import type { SearchPayload, TableTexts } from "../types";

//Props and Emits
const emits = defineEmits<{
  (e: "search", payload: string | SearchPayload): void;
}>();
const props = defineProps<{
  filtersOptions?: string[];
  showFilterInputs?: boolean;
  debounce: number;
  texts: TableTexts;
}>();

// Variables
const options = computed<string[]>(() => props.filtersOptions ?? []);
const filterValue: Ref<string> = ref("");
const search: Ref<string> = ref("");

//Functions
const payload = (): string | SearchPayload =>
  props.showFilterInputs
    ? { keySearch: filterValue.value, inputValue: search.value }
    : search.value;

let timeout: ReturnType<typeof setTimeout>;
watch(search, () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => emits("search", payload()), props.debounce);
});

// Changing the filter searches again right away. The first value is the preselected one, so it is skipped.
watch(filterValue, (_newValue, oldValue) => {
  if (!oldValue) return;
  clearTimeout(timeout);
  emits("search", payload());
});
</script>
<style>
.custom-multiselect .multiselect__option:hover {
  background-color: #2563eb;
  color: #ffffff;
}

.custom-multiselect .multiselect__option--selected {
  background-color: gray;
  color: #ffffff;
}
</style>
