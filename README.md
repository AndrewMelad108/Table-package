# VTable Component

## Overview

This component is a dynamic, customizable table designed to handle various data representations. It is built with **Vue 3**, **Vite**, and **TypeScript**. The component includes pagination, filtering options, and the ability to search through data, making it versatile for different use cases.

## Installation

To use this component in your Vue.js project, install the npm package:

```bash
npm install v-table-system
```

## Usage

### in Vue Template:

```bash
<template>
  <VTable
    :labels="labels"
    :data="data"
    :currentPage="currentPage"
    :totalPages="150"
    @changePage="changePage"
  ></VTable>
</template>

```

### in Vue Script:

```bash
<script setup lang="ts">
import { ref } from "vue";
import { VTable } from "v-table-system";
const labels = ref(["name", "description", "actions"]);
const currentPage = ref(1);
const data = ref([
  {
    name: "asd",
    description: "asd",
    actions: [
      {
        tag: "<p>add</p>",
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
// VPagination Function
const changePage = (page) => {
  currentPage.value = page;
};

</script>

```

## Select Row Functionality

To enable select row functionality in the VTable component, use the following template:

### in Vue Template:

```bash
<template>
  <VTable
    :labels="labels"
    :data="data"
    :currentPage="currentPage"
    :totalPages="150"
    :sortableColumns="sortableColumns"
    @changePage="changePage"
    @SortBy="SortBy"
    @selectRow="selectRowHandler"  <!-- Capture the selected row -->
  ></VTable>
</template>
```

### in Vue Script:

```bash
<script setup lang="ts">
import { ref } from "vue";
import { VTable } from "v-table-system";

const labels = ref(["name", "description", "actions"]);
const currentPage = ref(1);
const sortableColumns = ref(["name", "description"]);

const data = ref([
  {
    name: "John Doe",
    description: "Sample Description",
    actions: [
      {
        tag: "<p>add</p>",
        style: {},
        callback: () => {
          console.log("add success");
        },
      },
      {
        tag: "<p>edit</p>",
        style: {},
        callback: () => {
          console.log("edit success");
        },
      },
    ],
  },
  {
    name: "Jane Smith",
    description: "Another Description",
    actions: [
      {
        tag: "<p>add</p>",
        style: {},
        callback: () => {
          console.log("add success");
        },
      },
      {
        tag: "<p>edit</p>",
        style: {},
        callback: () => {
          console.log("edit success");
        },
      },
    ],
  },
]);

// Handle row selection
const selectRowHandler = (selectedRow) => {
  console.log("Selected Row:", selectedRow);
  // Implement any additional actions based on the selected row
};
</script>
```
## Search Functionality

To enable search functionality in the VTable component, use the following template:

### in Vue Template:

```bash
<template>
  <VTable
    :labels="labels"
    :data="data"
    :currentPage="currentPage"
    :totalPages="150"
    @changePage="changePage"
    :isShowSearch="true"  // Show search input
    @Search="handleSearch"  // Handle search functionality
  ></VTable>
</template>
```

### in Vue Script:

```bash
<script setup lang="ts">
import { ref } from "vue";
import { VTable } from "v-table-system";

const labels = ref(["name", "description", "actions"]);
const currentPage = ref(1);
const searchValue = ref("");
const data = ref([
  {
    // Your data here
  },
]);

// Search Function
const handleSearch = (value) => {
  searchValue.value = value;
  // Implement search logic based on searchValue
};
</script>
```

## Filter Functionality

To add filtering capabilities, you can use the following structure:

### in Vue Template:

```bash
<template>
  <VTable
    :labels="labels"
    :data="data"
    :currentPage="currentPage"
    :totalPages="150"
    :isShowSearch="true"  // Enable search input
    :showFilterInputs="true"  // Enable filter inputs
    :filtersOptions="filtersOptions"  // Provide filter options
    @Search="handleSearch"  // Handle search with filters
    @changePage="changePage"
  ></VTable>
</template>
```

### in Vue Script:

```bash
<script setup lang="ts">
import { ref } from "vue";
import { VTable } from "v-table-system";

const labels = ref(["name", "description", "actions"]);
const currentPage = ref(1);
const searchValue = ref("");  // Search value
const filtersOptions = ref([
  "value1",
  "value2",
  "value3",
  "value4",
]);  // Filter options
const data = ref([
  {
    // Your data here
  },
]);

// Search Function with Filter Options
const handleSearch = (filterObject) => {
  /*
  filterObject = {
    inputValue: "",
    keySearch: "value1"
  }
  */
  searchValue.value = filterObject.inputValue;
  const filterKey = filterObject.keySearch;
  // Implement search and filtering logic based on searchValue and filterKey
};
</script>

```

## Sort Functionality

To add sorting capabilities, you can use the following structure:

### in Vue Template:

```bash
<template>
  <VTable
    :labels="labels"
    :data="data"
    :currentPage="currentPage"
    :totalPages="150"
    :sortableColumns="sortableColumns"
    @changePage="changePage"
    @SortBy="SortBy"
  ></VTable>
</template>
```

### in Vue Script:

```bash
<script setup lang="ts">
import { ref } from "vue";
import { VTable } from "v-table-system";

// Define the columns that are sortable
const sortableColumns = ref(["name", "description"]);

// Define the labels for the table columns
const labels = ref(["name", "description", "actions"]);

// Track the current page number
const currentPage = ref(1);

// Sample data to display in the table
const data = ref([
  {
    name: "Example Name",
    description: "Example Description",
    actions: [
      {
        tag: "<p>add</p>",
        style: {},
        callback: () => {
          console.log("add success");
        },
      },
      {
        tag: "<p>edit</p>",
        style: {},
        callback: () => {
          console.log("edit success");
        },
      },
    ],
  },
]);

// Sort function to handle sorting logic
const SortBy = (Sortobject) => {
  /*
  Sortobject = {
    title: title,        // The column title to sort by
    direction: direction // The sorting direction (asc or desc)
  };
  */
  console.log(`Sorting by: ${Sortobject.title} in ${Sortobject.direction} order`);
  // Implement your sorting logic here
};
</script>


```
