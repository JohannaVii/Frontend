import type { Category } from "../types/category";
import type { Product } from "../types/product";

// hämtar gatewayens URL från .env.local
const API_BASE = import.meta.env.VITE_GATEWAY_API_URL;

// hämtar alla produkter via gatewayen
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/gateway/products`, {
    method: "GET",
    credentials: "include", // skickar med gatewayens cookie
  });

  if (!response.ok) {
    throw new Error("Produkter kunde inte hämtas!");
  }

  const data: Product[] = await response.json();
  return data;
}

// skapar en produkt via gatewayen
export async function createProduct(product: {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  imageUrl: string;
}) {
  const response = await fetch(`${API_BASE}/gateway/products`, {
    method: "POST",
    credentials: "include", // skickar med gatewayens cookie
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Produkten kunde inte skapas");
  }

  return response.json();
}

// hämtar en specifik produkt via gatewayen med produktens ID
export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE}/gateway/products/${id}`, {
    method: "GET",
    credentials: "include", // skickar med gatewayens cookie
  });

  if (!response.ok) {
    throw new Error("Produkten kunde inte hämtas!");
  }

  return response.json();
}
