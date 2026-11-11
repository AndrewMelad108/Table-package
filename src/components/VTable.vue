<template>
  <div class="Table vts overflow-auto bg-gray-100 dark:bg-gray-900 dark:text-gray-200 m-4 p-4 rounded-md">
    <!-- Table Filter -->
    <v-filter v-if="props.isShowSearch" :showFilterInputs="showFilterInputs" :filtersOptions="filtersOptions" :debounce="debounce" :texts="texts" @search="onSearch"></v-filter>

    <!-- Table Toolbar -->
    <div v-if="exportable || $slots.toolbar || (selectable && selectedRows.length)" class="flex flex-wrap items-center justify-between gap-2 mt-4 text-sm">
      <span>
        <template v-if="selectable && selectedRows.length">{{ selectedRows.length.toLocaleString("en") }} {{ texts.selected }}</template>
      </span>
      <div class="flex items-center gap-2">
        <slot name="toolbar" :rows="rows" :selected="selectedRows"></slot>
        <button v-if="exportable" type="button" class="h-9 px-3 rounded bg-primary text-white font-semibold hover:opacity-90" @click="exportCsv()">
          {{ texts.exportCsv }}
        </button>
      </div>
    </div>

    <!-- Table Loading -->
    <div v-if="props.loading" class="loader-spin flex justify-center items-center min-h-[300px]">
      <slot name="loading">
        <span class="animate-[spin_0.35s_linear_infinite] block border-2 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-10 h-10"></span>
      </slot>
    </div>
    <div v-else class="shadow-md max-h-[100vh] mt-4 overflow-x-auto shadow-gray-400 rounded-md max-w-[100%]" :class="{ 'pb-14': !maxHeight, 'overflow-y-auto': stickyHeader || maxHeight }" :style="maxHeight ? { 'max-height': maxHeight } : undefined">
      <table class="md:w-full w-[600px] border-collapse">
        <thead>
          <tr class="p-2">
            <th v-if="expandable" :class="[headClass, 'w-10']"></th>
            <th v-if="selectable" :class="[headClass, 'w-10']">
              <input type="checkbox" aria-label="Select all rows" class="cursor-pointer" :checked="allSelected" :indeterminate="someSelected && !allSelected" @change="toggleAll" />
            </th>
            <!-- Table Header -->
            <th v-for="col in cols" :key="col.key" :class="[headClass, col.headerClass]" :style="{ width: col.width ?? widthLabels, 'max-width': col.width ?? widthLabels }">
              <div class="flex gap-[2px] min-h-6" :class="justify[col.align ?? 'left']">
                <v-sort v-if="col.sortable" :title="col.key" :active="sort && sort.key === col.key ? sort.direction : null" @SortBy="onSort(col, $event.direction)" class="self-end"></v-sort>
                <p class="text-xs self-end">
                  <slot :name="`header-${col.key}`" :column="col">{{ col.label ?? col.key }}</slot>
                </p>
              </div>
            </th>
          </tr>
        </thead>

        <!-- Table Data -->
        <tbody>
          <template v-for="(item, index) in rows" :key="rowId(item, index)">
            <tr class="transition ease-in-out duration-300" :class="rowClasses(item, index)" @click="$emit('selectRow', item)">
              <td v-if="expandable" :class="cellClass" @click.stop>
                <button type="button" class="w-6 h-6 font-bold" :aria-expanded="isExpanded(item)" aria-label="Toggle row details" @click="toggleExpand(item)">
                  {{ isExpanded(item) ? "−" : "+" }}
                </button>
              </td>
              <td v-if="selectable" :class="cellClass" @click.stop>
                <input type="checkbox" aria-label="Select row" class="cursor-pointer" :checked="isSelected(item)" @change="toggleRow(item)" />
              </td>
              <td v-for="col in cols" :key="col.key" :style="{ width: col.width ?? widthLabels }" :class="[cellClass, align[col.align ?? 'left'], col.class]">
                <slot :name="`cell-${col.key}`" :row="item" :value="item[col.key]" :index="index" :column="col">
                  <div v-if="col.key === 'actions' && Array.isArray(item[col.key])" class="flex gap-1">
                    <button v-for="(btn, btnIndex) in (item[col.key] as RowAction[])" :key="btnIndex" :style="{ ...btn.style }" @click.stop="btn.callback && btn.callback($event, item)" v-html="btn.tag"></button>
                  </div>
                  <span v-else-if="col.html" v-html="col.html(item[col.key], item, index)"></span>
                  <span v-else>{{ col.format ? col.format(item[col.key], item, index) : item[col.key] }}</span>
                </slot>
              </td>
            </tr>
            <!-- Expanded Row -->
            <tr v-if="expandable && isExpanded(item)" class="bg-white dark:bg-gray-800">
              <td :colspan="cols.length + 1 + (selectable ? 1 : 0)" :class="cellClass">
                <slot name="expand" :row="item" :index="index">
                  <div v-if="expandRender" v-html="expandRender(item, index)"></div>
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <!-- Text No Data -->
      <div v-show="rows.length <= 0" class="not-data w-full min-h-[300px] text-center flex items-center justify-center font-bold text-md">
        <slot name="empty">{{ texts.noData }}</slot>
      </div>
    </div>

    <!-- Table Pagination -->
    <v-pagination v-if="showPagination" :itemsPerPage="pageSize" :pageSizeOptions="pageSizeOptions" :totalItems="total" :totalPages="pageCount" :currentPage="page" :texts="texts" @changePage="changePage" @changePageSize="changePageSize"></v-pagination>
  </div>
</template>
<script lang="ts" setup>
// Import Vue Files
import VPagination from "./VPagination.vue";
import VFilter from "./VFilter.vue";
import VSort from "./VSort.vue";
import "../style.css";
import { computed, ref, watch } from "vue";
import { defaultTexts } from "../types";
import type { Column, Row, RowAction, SearchPayload, SortDirection, SortPayload, SortState, TableTexts } from "../types";

//Props and Emits
const emits = defineEmits<{
  (e: "Search", payload: string | SearchPayload): void;
  (e: "changePage", page: number): void;
  (e: "update:currentPage", page: number): void;
  (e: "changeItemsPerPage", size: number): void;
  (e: "update:itemsPerPage", size: number): void;
  (e: "SortBy", payload: SortPayload): void;
  (e: "selectRow", row: Row): void;
  (e: "selectionChange", rows: Row[]): void;
  (e: "update:selected", rows: Row[]): void;
  (e: "expandChange", payload: { row: Row; expanded: boolean }): void;
}>();
const props = withDefaults(
  defineProps<{
    data?: Row[];
    /** Header texts, matched to the row properties by name or by position */
    labels?: string[];
    /** Column definitions. When set, `labels` is ignored */
    columns?: Column[];
    sortableColumns?: string[];
    loading?: boolean;
    /** Search, sort and paginate `data` inside the table instead of on the server */
    clientSide?: boolean;
    defaultSort?: SortState;

    isShowSearch?: boolean;
    showFilterInputs?: boolean;
    filtersOptions?: string[];
    filterInputs?: unknown;
    /** Delay in ms before the Search event fires. Defaults to 1000, or 300 with clientSide */
    searchDebounce?: number;

    showPagination?: boolean;
    currentPage?: number;
    /** Total number of items (kept for backward compatibility, same as totalItems) */
    totalPages?: number;
    totalItems?: number;
    itemsPerPage?: number;
    pageSizeOptions?: number[];

    selectable?: boolean;
    selected?: Row[];
    /** Property name or function that identifies a row. Needed to keep selection across pages */
    rowKey?: string | ((row: Row) => unknown);

    expandable?: boolean;
    /** Returns the HTML of an expanded row when the `expand` slot is not used */
    expandRender?: (row: Row, index: number) => string;

    exportable?: boolean;
    exportFileName?: string;

    striped?: boolean;
    hoverable?: boolean;
    bordered?: boolean;
    dense?: boolean;
    stickyHeader?: boolean;
    maxHeight?: string;
    rowClass?: string | ((row: Row, index: number) => string);
    texts?: Partial<TableTexts>;
  }>(),
  {
    data: () => [],
    showPagination: true,
    currentPage: 1,
    striped: true,
    hoverable: true,
    exportFileName: "table",
  }
);

const texts = computed<TableTexts>(() => ({ ...defaultTexts, ...props.texts }));

// Columns
const cols = computed<Column[]>(() => {
  if (props.columns && props.columns.length) {
    return props.columns
      .filter((col) => !col.hidden)
      .map((col) => ({ ...col, sortable: col.sortable ?? props.sortableColumns?.includes(col.key) }));
  }
  const first = props.data[0] ?? {};
  const keys = Object.keys(first);
  return (props.labels ?? keys).map((label, i) => ({
    key: label in first ? label : keys[i] ?? label,
    label,
    sortable: props.sortableColumns?.includes(label),
  }));
});
const widthLabels = computed(() => 100 / (cols.value.length || 1) + "%");

// Search
const searchText = ref("");
const searchKey = ref("");
const debounce = computed(() => props.searchDebounce ?? (props.clientSide ? 300 : 1000));
const onSearch = (payload: string | SearchPayload) => {
  searchText.value = typeof payload === "string" ? payload : payload.inputValue;
  searchKey.value = typeof payload === "string" ? "" : payload.keySearch;
  if (props.clientSide) setPage(1);
  emits("Search", payload);
};
const filtered = computed<Row[]>(() => {
  const query = searchText.value.trim().toLowerCase();
  if (!props.clientSide || !query) return props.data;
  const column = cols.value.find((col) => col.key === searchKey.value || col.label === searchKey.value);
  const keys = searchKey.value ? [column ? column.key : searchKey.value] : cols.value.map((col) => col.key);
  return props.data.filter((row) =>
    keys.some((key) => row[key] != null && typeof row[key] !== "object" && String(row[key]).toLowerCase().includes(query))
  );
});

// Sort
const sort = ref<SortState | null>(props.defaultSort ?? null);
const onSort = (col: Column, direction: SortDirection) => {
  sort.value = { key: col.key, direction };
  emits("SortBy", { title: props.columns && props.columns.length ? col.key : col.label ?? col.key, key: col.key, direction });
};
const compare = (a: unknown, b: unknown): number => {
  if (a == null || b == null) return a == null ? (b == null ? 0 : 1) : -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
};
const sorted = computed<Row[]>(() => {
  const state = sort.value;
  if (!props.clientSide || !state) return filtered.value;
  const column = cols.value.find((col) => col.key === state.key);
  const order = state.direction === "asc" ? 1 : -1;
  return [...filtered.value].sort((a, b) => order * (column?.sort ? column.sort(a, b) : compare(a[state.key], b[state.key])));
});

// Pagination
const page = ref(props.currentPage);
watch(() => props.currentPage, (value) => (page.value = value));
const chosenPageSize = ref<number>();
watch(() => props.itemsPerPage, () => (chosenPageSize.value = undefined));
const pageSize = computed(() => chosenPageSize.value ?? props.itemsPerPage ?? (props.clientSide ? props.pageSizeOptions?.[0] ?? 10 : 1));
const hasTotal = computed(() => props.totalItems != null || props.totalPages != null);
const total = computed(() => (props.clientSide ? filtered.value.length : props.totalItems ?? props.totalPages ?? props.data.length));
const pageCount = computed(() => (props.clientSide || hasTotal.value ? Math.ceil(total.value / pageSize.value) : 1));
const setPage = (value: number) => {
  if (value === page.value) return;
  page.value = value;
  emits("changePage", value);
  emits("update:currentPage", value);
};
const changePage = (value: number) => setPage(value);
const changePageSize = (size: number) => {
  chosenPageSize.value = size;
  emits("changeItemsPerPage", size);
  emits("update:itemsPerPage", size);
  setPage(1);
};
const rows = computed<Row[]>(() => {
  if (!props.clientSide || !props.showPagination) return sorted.value;
  const current = Math.min(page.value, pageCount.value || 1);
  return sorted.value.slice((current - 1) * pageSize.value, current * pageSize.value);
});

// Selection
const keyOf = (row: Row): unknown => (typeof props.rowKey === "function" ? props.rowKey(row) : props.rowKey ? row[props.rowKey] : row);
const rowId = (row: Row, index: number): PropertyKey => {
  const key = keyOf(row);
  return typeof key === "string" || typeof key === "number" ? key : index;
};
const selectedRows = ref<Row[]>(props.selected ?? []);
watch(() => props.selected, (value) => (selectedRows.value = value ?? []));
const isSelected = (row: Row) => selectedRows.value.some((item) => keyOf(item) === keyOf(row));
const allSelected = computed(() => rows.value.length > 0 && rows.value.every(isSelected));
const someSelected = computed(() => rows.value.some(isSelected));
const setSelected = (value: Row[]) => {
  selectedRows.value = value;
  emits("update:selected", value);
  emits("selectionChange", value);
};
const toggleRow = (row: Row) => {
  setSelected(isSelected(row) ? selectedRows.value.filter((item) => keyOf(item) !== keyOf(row)) : [...selectedRows.value, row]);
};
const toggleAll = () => {
  const pageKeys = rows.value.map(keyOf);
  const others = selectedRows.value.filter((item) => !pageKeys.includes(keyOf(item)));
  setSelected(allSelected.value ? others : [...others, ...rows.value]);
};
const clearSelection = () => setSelected([]);

// Expandable rows
const expanded = ref<unknown[]>([]);
const isExpanded = (row: Row) => expanded.value.includes(keyOf(row));
const toggleExpand = (row: Row) => {
  const open = !isExpanded(row);
  expanded.value = open ? [...expanded.value, keyOf(row)] : expanded.value.filter((key) => key !== keyOf(row));
  emits("expandChange", { row, expanded: open });
};

// Export
const exportCsv = (fileName: string = props.exportFileName) => {
  const columns = cols.value.filter((col) => col.key !== "actions");
  const escape = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const lines = [
    columns.map((col) => escape(col.label ?? col.key)).join(","),
    ...sorted.value.map((row, index) =>
      columns.map((col) => escape(col.format ? col.format(row[col.key], row, index) : row[col.key])).join(",")
    ),
  ];
  // The BOM makes Excel read the file as UTF-8
  const url = URL.createObjectURL(new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

// Styles
const justify = { left: "justify-start", center: "justify-center", right: "justify-end" };
const align = { left: "text-start", center: "text-center", right: "text-end" };
const headClass = computed(() => [
  "py-4 px-2 text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400",
  { "sticky top-0 z-10": props.stickyHeader, "border border-gray-300 dark:border-gray-600": props.bordered },
]);
const cellClass = computed(() => [
  props.dense ? "px-3 py-1" : "p-3",
  { "border border-gray-300 dark:border-gray-600": props.bordered },
]);
const rowClasses = (row: Row, index: number) => [
  "cursor-pointer",
  props.striped && index % 2 === 0 ? "bg-gray-200 dark:bg-gray-800" : "bg-white dark:bg-gray-900",
  { "hover:bg-gray-300 dark:hover:bg-gray-700": props.hoverable, "!bg-primary-light dark:!bg-primary-dark-light": isSelected(row) && props.selectable },
  typeof props.rowClass === "function" ? props.rowClass(row, index) : props.rowClass,
];

defineExpose({ exportCsv, clearSelection });
</script>
