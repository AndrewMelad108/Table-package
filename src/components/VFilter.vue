<template>
  <div class="filter-inputs w-full p-4 bg-slate-50 rounded-md shadow-md">
    <div class="search-input grid sm:gap-6 gap-4 sm:grid-cols-3 grid-cols-1">
      <multiselect
        v-if="props.showFilterInputs"
        v-model="filterValue"
        :options="options"
        class="custom-multiselect"
        :searchable="false"
        :preselect-first="true"
        :allow-empty="false"
        placeholder="Select filter value"
        selected-label=""
        select-label=""
        deselect-label=""
      ></multiselect>
      <input
        v-model="search"
        type="text"
        class="form-input text-primary focus:outline-0 h-10 p-2"
        :class="
          props.showFilterInputs
            ? 'md:col-start-2 md:col-end-4'
            : 'col-start-1 col-end-2'
        "
        placeholder="Search ..."
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { watch, defineEmits, defineProps, ref, type Ref } from "vue";
import Multiselect from "@suadelabs/vue3-multiselect";
import "@suadelabs/vue3-multiselect/dist/vue3-multiselect.css";
const emits = defineEmits(["search"]);
const props = defineProps(["filtersOptions", "showFilterInputs"]);
const options: Ref<string[]> = ref([...props.filtersOptions]);
const filterValue: Ref<string> = ref("");
const search: Ref<string> = ref("");
function debounce(func: any, wait: any) {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
const debouncedSearchEmit = debounce((newValue: any) => {
  emits("search", newValue);
}, 1000);

watch(search, (newValue: any) => {
  if (props.showFilterInputs === true) {
    debouncedSearchEmit({
      keySearch: filterValue.value,
      inputValue: newValue,
    });
  } else {
    debouncedSearchEmit(newValue);
  }
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
