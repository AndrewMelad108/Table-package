# Styling, dark mode and RTL

<script setup>
import Styling from '../demos/Styling.vue'
</script>

<Demo><Styling /></Demo>

<<< @/demos/Styling.vue

## Appearance props

| Prop | Default | Description |
| --- | --- | --- |
| `striped` | `true` | Alternating row colours. |
| `hoverable` | `true` | Highlights the row under the pointer. |
| `bordered` | `false` | Borders around every cell. |
| `dense` | `false` | Less vertical padding. |
| `stickyHeader` | `false` | Keeps the header visible while the rows scroll. Use it with `maxHeight`. |
| `maxHeight` | | Any CSS height, such as `"400px"`. The rows scroll inside it. |
| `rowClass` | | A class for every row, or a function `(row, index) => string` to style some rows. |

## Your own CSS

The styles are injected with the component and only touch the table itself, so they will not change the rest of your page. To override them, target the table's root class, `.vts`:

```css
.vts {
  font-family: "Inter", sans-serif;
}
.vts th {
  background: #1e293b;
  color: white;
}
```

## Dark mode

The dark colours apply when the table is inside an element with the class `dark`, usually `<html class="dark">`. Tailwind CSS uses the same convention. Try the theme switch at the top of this page.

## Right-to-left

Put the table inside an element with `dir="rtl"`, or set it on `<html>`. Text alignment, the pagination arrows and the spacing follow the direction.

## Texts

Every built-in text can be replaced, for translation or wording, with the `texts` prop. Only pass the ones you want to change.

```vue
<VTable
  :texts="{
    total: 'الإجمالي',
    search: 'بحث ...',
    noData: 'لا توجد بيانات',
    rowsPerPage: 'عدد الصفوف',
    exportCsv: 'تصدير CSV',
    selected: 'محدد',
    filterPlaceholder: 'اختر الفلتر',
  }"
/>
```

| Key | Default |
| --- | --- |
| `total` | `Total` |
| `search` | `Search ...` |
| `filterPlaceholder` | `Select filter value` |
| `noData` | `No data available` |
| `rowsPerPage` | `Rows per page` |
| `exportCsv` | `Export CSV` |
| `selected` | `selected` |
