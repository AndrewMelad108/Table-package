# Next.js

In Next.js the table is the [web component](/frameworks/), wrapped in a client component. The example below uses the App Router and was tested with Next.js 16 and React 19.

```bash
npm install v-table-system
```

## The client component

```tsx
// app/ProductsTable.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type Row = Record<string, any>;

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "price", label: "Price", format: (value: number) => `$${value}` },
];

export function ProductsTable({ products }: { products: Row[] }) {
  const ref = useRef<any>(null);
  const [selected, setSelected] = useState<Row[]>([]);

  // Register the element after hydration
  useEffect(() => {
    import("v-table-system/element");
  }, []);

  useEffect(() => {
    const element = ref.current;
    element.columns = columns;
    element.data = products;

    // The payload of an event is in event.detail[0]
    const onSelection = (event: CustomEvent) => setSelected(event.detail[0]);
    element.addEventListener("selectionChange", onSelection);
    return () => element.removeEventListener("selectionChange", onSelection);
  }, [products]);

  return (
    <>
      <v-table-system ref={ref} client-side selectable is-show-search row-key="id" items-per-page="10" />
      <p>{selected.length} selected</p>
    </>
  );
}
```

## The page

Load the rows in a server component and pass them down:

```tsx
// app/page.tsx
import { ProductsTable } from "./ProductsTable";

export default async function Page() {
  const response = await fetch("https://example.com/api/products");
  const products = await response.json();

  return <ProductsTable products={products} />;
}
```

## Things to know

- Import `v-table-system/element` inside `useEffect`, as above. With a normal import at the top of the file, the table draws itself before React hydrates the page and React reports a hydration error.
- Keep `columns` in the client component. A server component cannot pass functions such as `format` to a client component.
- Server components pass `products` as plain JSON, so rows cannot contain functions or class instances.

## TypeScript

Declare the tag once, for example in `v-table-system.d.ts` at the root of the project:

```ts
import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "v-table-system": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, unknown>;
    }
  }
}
```

## Server-side pagination

For large data, leave `client-side` out and reload the rows when the table asks for another page. Set `totalItems` and `itemsPerPage` on the element, listen to `changePage`, `Search` and `SortBy`, and fetch from a route handler or a server action. [Server-side data](/guide/server-side) lists what each event sends.
