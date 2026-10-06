import type { OrderRequest } from "../types/order";
import { getToken } from "./authServer";

const API_BASE = import.meta.env.VITE_ORDER_API_URL;

// skickar en order till Order Service
export async function createOrder(orderRequest: OrderRequest) {
  const token = getToken();

  // skickar requesten till Order Service och väntar på svar
  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderRequest),
  });

  // visar ett fel om Order Service inte kunde skapa ordern
  if (!response.ok) {
    throw new Error("Ordern kunde inte skapas!");
  }

  return response.json();
}
