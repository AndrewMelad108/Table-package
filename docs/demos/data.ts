export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "draft";
}

const names = ["Keyboard", "Mouse", "Monitor", "Headset", "Webcam", "Laptop stand", "USB hub", "Desk lamp"];
const categories = ["Accessories", "Displays", "Audio", "Office"];

// 48 products, always the same so the examples are easy to follow
export const products: Product[] = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  name: `${names[i % names.length]} ${Math.floor(i / names.length) + 1}`,
  category: categories[(i * 3) % categories.length],
  price: 15 + ((i * 37) % 180),
  stock: (i * 11) % 60,
  status: i % 4 === 0 ? "draft" : "active",
}));
