# Custom cells and actions

<script setup>
import CustomCells from '../demos/CustomCells.vue'
</script>

<Demo><CustomCells /></Demo>

<<< @/demos/CustomCells.vue

## Ways to change a cell

There are three, from the simplest to the most flexible:

1. `format` on the column returns plain text. Best for dates, money and numbers.
2. `html` on the column returns an HTML string. It also works in the [web component](/frameworks/).
3. A `cell-<key>` slot renders anything, including your own components.

```ts
const columns: Column[] = [
  { key: "price", format: (value) => `$${value.toFixed(2)}` },
  { key: "status", html: (value) => `<span class="badge">${value}</span>` },
];
```

::: warning
`html` output and action `tag`s are inserted as HTML. Never pass user input to them without escaping it.
:::

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `cell-<key>` | `row`, `value`, `index`, `column` | The content of a cell in the column `<key>`. |
| `header-<key>` | `column` | The header text of the column `<key>`. |
| `expand` | `row`, `index` | The details of an [expanded row](/guide/expandable-rows). |
| `toolbar` | `rows`, `selected` | Extra content in the bar above the table. |
| `empty` | | Shown when there are no rows. |
| `loading` | | Shown instead of the spinner while `loading` is true. |

## Row actions

A row property named `actions` holding an array is rendered as a list of buttons. Each action has:

| Field | Type | Description |
| --- | --- | --- |
| `tag` | `string` | HTML shown inside the button, text or an icon. |
| `style` | `object` | Inline styles of the button. |
| `callback` | `(event, row) => void` | Called on click. |

Clicking an action does not trigger `selectRow`.

For anything more than simple buttons, use the `cell-actions` slot instead.
