# Astro

In Astro, put the [web component](/frameworks/) in the page and set it up from a `<script>`. Astro bundles the script and runs it in the browser, so no UI framework integration is needed. The example below was tested with Astro 7.

```bash
npm install v-table-system
```

```astro
---
// src/pages/products.astro
// This part runs on the server
const response = await fetch("https://example.com/api/products");
const products = await response.json();
---

<v-table-system
  id="products"
  client-side
  selectable
  is-show-search
  row-key="id"
  items-per-page="10"
  data-rows={JSON.stringify(products)}
></v-table-system>

<script>
  import "v-table-system/element";

  const table = document.getElementById("products") as any;

  table.columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "price", label: "Price", format: (value: number) => `$${value}` },
  ];
  table.data = JSON.parse(table.dataset.rows);

  // The payload of an event is in event.detail[0]
  table.addEventListener("selectionChange", (event: CustomEvent) => {
    console.log(event.detail[0]);
  });
</script>
```

## Things to know

- The frontmatter runs on the server and the `<script>` runs in the browser, so they cannot share variables. Pass the rows through a `data-` attribute as JSON, as above.
- `columns` holds functions, which JSON cannot carry. Define it in the `<script>`.
- For rows that should not be in the page HTML, leave `client-side` out and fetch each page from an API endpoint on `changePage`. See [Server-side data](/guide/server-side).
