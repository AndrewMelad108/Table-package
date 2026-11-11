# Getting started

`v-table-system` is a data table. It comes in two forms:

- a Vue 3 component, `VTable`, covered in this guide
- a web component, `<v-table-system>`, for [React, Next.js, Angular, Astro, Svelte and plain HTML](/frameworks/)

Both have the same features and the same options.

## Install

```bash
npm install v-table-system
```

Vue 3.4 or newer is required for the Vue component. The styles are included, there is no CSS file to import.

## Your first table

Give the table its `columns` and its `data`. With `clientSide` the table sorts, searches and paginates the array by itself.

<script setup>
import Basic from '../demos/Basic.vue'
</script>

<Demo><Basic /></Demo>

<<< @/demos/Basic.vue

The examples in this guide all use the same list of 48 products:

<<< @/demos/data.ts

## Client-side and server-side data

| | Client-side | Server-side |
| --- | --- | --- |
| How | Add the `clientSide` prop | Leave `clientSide` out |
| `data` holds | Every row | Only the rows of the current page |
| Search, sort, paging | Done by the table | Done by your API, the table emits events |
| Good for | Data already loaded in the browser | Large or remote data |

Most pages of this guide use `clientSide` to keep the examples short. [Server-side data](/guide/server-side) shows the other way.

## Next steps

- [Columns](/guide/columns) to control what each column shows
- [Sorting](/guide/sorting), [search](/guide/search) and [pagination](/guide/pagination)
- The full list of props, events and slots in the [API reference](/api)
