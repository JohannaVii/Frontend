import type { Category } from "../types/category";
import type { Product } from "../types/product";
import { getToken } from "./authServer";

const API_BASE = import.meta.env.VITE_PRODUCT_API_URL;

export async function getProducts(): Promise<Product[]> {
  const token = getToken();

  const response = await fetch(`${API_BASE}/products`, {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    throw new Error("Produkter kunde inte hämtas!");
  }

  const data: Product[] = await response.json();

  return data;
}

export async function createProduct(product: {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  imageUrl: string;
}) {
  const token = getToken();

  const response = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {

    throw new Error("Produkten kunde inte skapas");
  }
  return response.json();
}