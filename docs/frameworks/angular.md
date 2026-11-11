# Angular

Angular can bind to custom elements directly. Register the [web component](/frameworks/) once and allow the tag with `CUSTOM_ELEMENTS_SCHEMA`.

```bash
npm install v-table-system
```

```ts
// main.ts
import "v-table-system/element";
```

```ts
// products.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: "app-products",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <v-table-system
      client-side
      selectable
      is-show-search
      row-key="id"
      [columns]="columns"
      [data]="rows"
      [itemsPerPage]="10"
      (selectionChange)="onSelection($event)"
      (changePage)="onPage($event)"
    ></v-table-system>

    <p>{{ selected.length }} selected</p>
  `,
})
export class ProductsComponent {
  columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "price", label: "Price", format: (value: number) => `$${value}` },
  ];

  rows = [
    { id: 1, name: "Keyboard", price: 49 },
    { id: 2, name: "Mouse", price: 19 },
  ];

  selected: object[] = [];

  // The payload of an event is in event.detail[0]
  onSelection(event: Event) {
    this.selected = (event as CustomEvent).detail[0];
  }

  onPage(event: Event) {
    const page: number = (event as CustomEvent).detail[0];
    console.log("page", page);
  }
}
```

## Notes

- `[columns]="..."` sets a property, which is what arrays, objects and functions need. Flags and text can stay plain attributes.
- With NgModules, add `schemas: [CUSTOM_ELEMENTS_SCHEMA]` to the module that declares the component instead.
- To call a method, get the element with `@ViewChild`:

```ts
@ViewChild("table") table!: ElementRef;

exportProducts() {
  this.table.nativeElement.exportCsv("products");
}
```

```html
<v-table-system #table exportable ...></v-table-system>
```
