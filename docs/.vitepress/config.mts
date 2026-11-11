import { resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig, postcssIsolateStyles } from "vitepress";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const root = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig({
  title: "v-table-system",
  description: "Data table for Vue 3 that also works as a web component in any framework",
  lang: "en-US",
  // Set DOCS_BASE when the site is served from a sub path, for example /Table-package/
  base: process.env.DOCS_BASE || "/",
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Frameworks", link: "/frameworks/" },
      { text: "API", link: "/api" },
      { text: "npm", link: "https://www.npmjs.com/package/v-table-system" },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting started", link: "/guide/getting-started" },
          { text: "Columns", link: "/guide/columns" },
          { text: "Sorting", link: "/guide/sorting" },
          { text: "Search and filter", link: "/guide/search" },
          { text: "Pagination", link: "/guide/pagination" },
          { text: "Row selection", link: "/guide/selection" },
          { text: "Expandable rows", link: "/guide/expandable-rows" },
          { text: "Custom cells and actions", link: "/guide/custom-cells" },
          { text: "CSV export", link: "/guide/export" },
          { text: "Server-side data", link: "/guide/server-side" },
          { text: "Styling, dark mode and RTL", link: "/guide/styling" },
          { text: "Upgrading from 0.0.x", link: "/guide/migration" },
        ],
      },
      {
        text: "Frameworks",
        items: [
          { text: "Web component", link: "/frameworks/" },
          { text: "Vue", link: "/frameworks/vue" },
          { text: "React", link: "/frameworks/react" },
          { text: "Next.js", link: "/frameworks/next" },
          { text: "Angular", link: "/frameworks/angular" },
          { text: "Astro", link: "/frameworks/astro" },
          { text: "Svelte", link: "/frameworks/svelte" },
        ],
      },
      { text: "Reference", items: [{ text: "API", link: "/api" }] },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/AndrewMelad108/Table-package" }],
    search: { provider: "local" },
    outline: [2, 3],
    footer: { message: "Released under the Apache-2.0 License." },
  },
  vue: {
    template: {
      compilerOptions: { isCustomElement: (tag) => tag === "v-table-system" },
    },
  },
  vite: {
    resolve: {
      // The demos import the package by name and get the local source
      alias: [
        { find: /^v-table-system\/element$/, replacement: resolve(root, "src/element.ts") },
        { find: /^v-table-system$/, replacement: resolve(root, "src/index.ts") },
      ],
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({ config: resolve(root, "tailwind.config.cjs") }),
          autoprefixer(),
          // Keeps the VitePress content styles out of the live demos (class vp-raw)
          postcssIsolateStyles({ includeFiles: [/vp-doc\.css/, /base\.css/] }),
        ],
      },
    },
  },
});
