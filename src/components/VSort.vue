<template>
  <div class="sort-column flex flex-col gap-[0.5px]">
    <span
      @click="SortBy(title, 'asc')"
      class="-rotate-90 cursor-pointer hover:opacity-5"
    >
      <img src="../assets/icon.svg" alt="icon-svg" class="w-4 h-[8px]" />
    </span>
    <span
      @click="SortBy(title, 'desc')"
      class="rotate-90 cursor-pointer hover:opacity-5"
    >
      <img src="../assets/icon.svg" alt="icon-svg" class="w-4 h-[8px]" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
const props = defineProps<{
  title: string;
}>();
const emits = defineEmits<{
  (e: "SortBy", payload: { title: string; direction: string }): void;
}>();

// Sort function
const SortBy = (title: string, direction: string) => {
  emits("SortBy", {
    title: title,
    direction: direction,
  });
};
</script>

<style scoped></style>
