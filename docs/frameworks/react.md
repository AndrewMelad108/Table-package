# React

Register the [web component](/frameworks/) once, then wrap it in a small React component that passes the data and listens to the events through a ref. This works in React 18 and 19.

```bash
npm install v-table-system
```

```tsx
// DataTable.tsx
import { useEffect, useRef } from "react";
import "v-table-system/element";

type Row = Record<string, any>;

interface Props {
  columns: object[];
  data: Row[];
  onSelectionChange?: (rows: Row[]) => void;
  onPageChange?: (page: number) => void;
}

export function DataTable({ columns, data, onSelectionChange, onPageChange }: Props) {
  const ref = useRef<any>(null);

  // Arrays and objects are set as properties
  useEffect(() => {
    ref.current.columns = columns;
    ref.current.data = data;
  }, [columns, data]);

  // The payload of an event is in event.detail[0]
  useEffect(() => {
    const element = ref.current;
    const selection = (event: CustomEvent) => onSelectionChange?.(event.detail[0]);
    const page = (event: CustomEvent) => onPageChange?.(event.detail[0]);
    element.addEventListener("selectionChange", selection);
    element.addEventListener("changePage", page);
    return () => {
      element.removeEventListener("selectionChange", selection);
      element.removeEventListener("changePage", page);
    };
  }, [onSelectionChange, onPageChange]);

  return <v-table-system ref={ref} client-side selectable is-show-search row-key="id" items-per-page="10" />;
}
```

```tsx
// App.tsx
import { useState } from "react";
import { DataTable } from "./DataTable";

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "price", label: "Price", format: (value: number) => `$${value}` },
];

const data = [
  { id: 1, name: "Keyboard", price: 49 },
  { id: 2, name: "Mouse", price: 19 },
];

export default function App() {
  const [selected, setSelected] = useState<object[]>([]);
  return (
    <>
      <DataTable columns={columns} data={data} onSelectionChange={setSelected} />
      <p>{selected.length} selected</p>
    </>
  );
}
```

::: tip Keep columns stable
Define `columns` outside the component or with `useMemo`. A new array on every render makes the table render again.
:::

## TypeScript

Tell TypeScript about the tag once, for example in `src/v-table-system.d.ts`:

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

## Next.js

The element needs the browser. Put the wrapper in a client component (`"use client"`) and load it without server rendering:

```tsx
import dynamic from "next/dynamic";

const DataTable = dynamic(() => import("./DataTable").then((module) => module.DataTable), { ssr: false });
```
