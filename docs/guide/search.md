# Search and filter

`isShowSearch` adds a search box above the table. `showFilterInputs` adds a dropdown next to it, filled from `filtersOptions`, so the user can choose which field to search in.

<script setup>
import Search from '../demos/Search.vue'
</script>

<Demo><Search /></Demo>

<<< @/demos/Search.vue

## The `Search` event

The event fires after the user stops typing, and right away when the dropdown changes.

| Setup | Payload |
| --- | --- |
| Search box only | `"mouse"` |
| Search box and dropdown | `{ keySearch: "category", inputValue: "audio" }` |

## Client-side search

With `clientSide` the table filters the rows itself, ignoring case:

- without the dropdown it looks in every visible column
- with the dropdown it looks only in the chosen field. An option can be a column key, a column label, or any other property of the rows.

## Typing delay

`searchDebounce` is the wait in milliseconds between the last key press and the `Search` event. The default is `1000`, or `300` with `clientSide`.

```vue
<VTable isShowSearch :searchDebounce="500" ... />
```
