<template>
  <div class="vp-raw demo">
    <ClientOnly>
      <slot />
    </ClientOnly>
  </div>
</template>

<style>
.demo {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 14px;
  overflow: hidden;
}
.demo .demo-log {
  margin: 0 16px 16px;
  padding: 8px 12px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  white-space: pre-wrap;
}
.demo .demo-options {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 12px 16px 0;
}
</style>
