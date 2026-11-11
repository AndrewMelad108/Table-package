<template>
  <div class="sort-column flex flex-col gap-[0.5px]">
    <button type="button" aria-label="Sort ascending" class="-rotate-90 hover:opacity-100" :class="active === 'asc' ? 'opacity-100' : 'opacity-30'" @click="SortBy(title, 'asc')">
      <img src="../assets/icon.svg" alt="" class="w-4 h-[8px] dark:invert" />
    </button>
    <button type="button" aria-label="Sort descending" class="rotate-90 hover:opacity-100" :class="active === 'desc' ? 'opacity-100' : 'opacity-30'" @click="SortBy(title, 'desc')">
      <img src="../assets/icon.svg" alt="" class="w-4 h-[8px] dark:invert" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { SortDirection } from "../types";

defineProps<{
  title: string;
  active?: SortDirection | null;
}>();
const emits = defineEmits<{
  (e: "SortBy", payload: { title: string; direction: SortDirection }): void;
}>();

// Sort function
const SortBy = (title: string, direction: SortDirection) => {
  emits("SortBy", {
    title: title,
    direction: direction,
  });
};
</script>
