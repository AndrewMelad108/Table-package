# CSV export

`exportable` adds an **Export CSV** button above the table. `exportFileName` sets the name of the downloaded file, without the extension.

<script setup>
import Export from '../demos/Export.vue'
</script>

<Demo><Export /></Demo>

<<< @/demos/Export.vue

## What ends up in the file

- The visible columns, with their labels as the first line. The `actions` column is skipped.
- Values go through the column's `format` function. `html` and slots are not used, the raw value is written instead.
- With `clientSide`: every row that matches the current search, in the current sort order, not only the current page.
- Without `clientSide`: the rows currently in `data`, which is the current page.

The file is UTF-8 with a byte order mark, so Excel opens Arabic and other non-Latin text correctly.

## Your own button

Call `exportCsv(fileName?)` on the component to start the download from anywhere. Change the label of the built-in button with the [`texts`](/guide/styling#texts) prop.
