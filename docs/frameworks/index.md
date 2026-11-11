# Web component

Outside Vue, use the table as a standard custom element, `<v-table-system>`. Vue is bundled inside it, so there is nothing else to install. It has the same features as the Vue component.

There is a page for each framework: [Vue](/frameworks/vue), [React](/frameworks/react), [Next.js](/frameworks/next), [Angular](/frameworks/angular), [Astro](/frameworks/astro) and [Svelte](/frameworks/svelte). This page covers plain HTML and the rules that apply everywhere.

<script setup>
import WebComponent from '../demos/WebComponent.vue'
</script>

<Demo><WebComponent /></Demo>

## Plain HTML

Load the script from a CDN and use the tag:

```html
<v-table-system id="table" client-side is-show-search selectable row-key="id" items-per-page="10"></v-table-system>

<script src="https://unpkg.com/v-table-system/dist/v-table-system.element.iife.js"></script>
<script>
  const table = document.getElementById("table");

  table.columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "price", label: "Price", format: (value) => `$${value}` },
  ];
  table.data = [
    { id: 1, name: "Keyboard", price: 49 },
    { id: 2, name: "Mouse", price: 19 },
  ];

  table.addEventListener("selectionChange", (event) => {
    const rows = event.detail[0];
    console.log(rows);
  });
</script>
```

## With a bundler

```bash
npm install v-table-system
```

```js
import "v-table-system/element";
```

The import registers `<v-table-system>` once for the whole app. To use another tag name, call `register("my-table")` from the same module.

## Differences from the Vue component

The options are the ones in the [API reference](/api). Three things differ from the Vue component.

### 1. Simple values are attributes, everything else is a property

Text, numbers and flags can be written in the HTML, in kebab-case:

```html
<v-table-system client-side items-per-page="10" row-key="id" max-height="400px"></v-table-system>
```

Arrays, objects and functions (`data`, `columns`, `selected`, `texts`, `pageSizeOptions`, `rowClass`, ...) must be set from JavaScript, in camelCase:

```js
table.data = rows;
table.pageSizeOptions = [10, 25, 50];
```

To turn off a flag that is on by default, set the property. The attribute `striped="false"` does not work.

```js
table.striped = false;
```

### 2. Events are DOM events, the payload is in `event.detail[0]`

```js
table.addEventListener("changePage", (event) => {
  const page = event.detail[0];
});
```

Every event is also sent under a kebab-case name, for frameworks that prefer it: `change-page`, `sort-by`, `search`, `select-row`, `selection-change`, `change-items-per-page`, `expand-change`.

### 3. No slots

Use the column options [`format` and `html`](/guide/custom-cells#ways-to-change-a-cell) for cells, and [`expandRender`](/guide/expandable-rows#without-a-slot) for expanded rows.

## Methods

`exportCsv(fileName?)` and `clearSelection()` are available on the element:

```js
document.getElementById("table").exportCsv("products");
```

## Styles

The element does not use a shadow root. Its styles are added to the page when the script loads and only target the table, and your own CSS can [override them](/guide/styling#your-own-css).
