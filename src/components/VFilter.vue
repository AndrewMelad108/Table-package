<template>
  <div class="filter-inputs w-full p-4 bg-slate-50 rounded-md shadow-md">
    <div
      class="search-input grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-4 item-center"
    >
      <multiselect
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
        class="form-input text-primary col-start-2 col-end-4"
        placeholder="Search any field ..."
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { watch, defineEmits, ref } from "vue";
import Multiselect from "@suadelabs/vue3-multiselect";
import "@suadelabs/vue3-multiselect/dist/vue3-multiselect.css";
const emits = defineEmits(["search"]);
const options = ref([
  "Select  value",
  "diagnosis",
  "referred by",
  "diagnosed by",
  "number",
]);
const filterValue = ref("");
const search = ref("");
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
const debouncedSearchEmit = debounce((newValue) => {
  emits("search", newValue);
}, 1000);

watch(search, (newValue) => {
  debouncedSearchEmit({
    keySearch: filterValue.value.split(" ").join("_"),
    inputValue: newValue,
  });
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
