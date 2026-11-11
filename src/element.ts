import { defineCustomElement } from "vue";
import "./style.css";
import VTable from "./components/VTable.vue";

// No shadow root, so the table styles (injected into the page) apply to it
export const VTableElement = defineCustomElement(VTable, { shadowRoot: false });

export function register(tag = "v-table-system"): void {
  if (typeof customElements !== "undefined" && !customElements.get(tag)) {
    customElements.define(tag, VTableElement);
  }
}

register();
