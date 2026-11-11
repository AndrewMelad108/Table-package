# Svelte

Svelte sets properties on custom elements for you, so the [web component](/frameworks/) reads almost like a Svelte component.

```bash
npm install v-table-system
```

```svelte
<script>
  import "v-table-system/element";

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "price", label: "Price", format: (value) => `$${value}` },
  ];

  const rows = [
    { id: 1, name: "Keyboard", price: 49 },
    { id: 2, name: "Mouse", price: 19 },
  ];

  let selected = $state([]);
  let table;
</script>

<v-table-system
  bind:this={table}
  client-side
  selectable
  exportable
  is-show-search
  row-key="id"
  items-per-page="10"
  {columns}
  data={rows}
  onselectionChange={(event) => (selected = event.detail[0])}
></v-table-system>

<p>{selected.length} selected</p>
<button onclick={() => table.exportCsv("products")}>Export</button>
```

## Notes

- The payload of an event is in `event.detail[0]`.
- Event attributes are case sensitive in Svelte 5: `onselectionChange` listens to `selectionChange`.
- In Svelte 4, use `let selected = [];` and `on:selectionChange={...}`.
- With SvelteKit, the element needs the browser. Import it inside `onMount`:

```js
import { onMount } from "svelte";

onMount(() => import("v-table-system/element"));
```
