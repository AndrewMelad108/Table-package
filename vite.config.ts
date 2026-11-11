import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { resolve } from "path";

// https://vitejs.dev/config/
// `vite build` builds the Vue component, `vite build --mode element` builds the
// web component, which has Vue bundled so it works without any framework.
export default defineConfig(({ mode }) => {
  const isElement = mode === "element";
  return {
    plugins: [vue(), cssInjectedByJsPlugin()],
    define: isElement ? { "process.env.NODE_ENV": JSON.stringify("production") } : {},
    build: {
      cssCodeSplit: false,
      // vue3-multiselect is CommonJS and calls require("vue"). Vue has no default
      // export in its ES build, so import it as a namespace.
      commonjsOptions: { esmExternals: true },
      copyPublicDir: false,
      emptyOutDir: !isElement,
      lib: isElement
        ? {
            entry: "./src/element.ts",
            formats: ["es", "iife"],
            name: "VTableSystem",
            fileName: (format) => `v-table-system.element.${format}.js`,
          }
        : {
            entry: "./src/index.ts",
            formats: ["es", "cjs"],
            name: "ViewerPlugin",
            fileName: (format) => `v-table-system.${format}.js`,
          },
      rollupOptions: isElement
        ? {}
        : {
            external: ["vue"],
            output: {
              exports: "named",
              globals: {
                vue: "Vue",
              },
            },
          },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
  };
});
