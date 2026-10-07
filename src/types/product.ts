
import type { Category } from "./category";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  imageUrl: string;
};
