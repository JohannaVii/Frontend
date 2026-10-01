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
