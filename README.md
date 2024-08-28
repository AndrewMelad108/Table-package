# VTable Component

## Overview

This component is a dynamic, customizable table designed to handle various data representations. It is built with **Vue 3**, **Vite**, and **TypeScript**. The component includes pagination, filtering options, and the ability to search through data, making it versatile for different use cases.

## Installation

To use this component in your Vue.js project, install the npm package:

```bash
npm install v-table-component
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
import { VTable } from "v-table-component";
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
