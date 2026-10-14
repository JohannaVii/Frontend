import type { OrderRequest } from "../types/order";

// hämtar gatewayens URL från .env.local
const API_BASE = import.meta.env.VITE_GATEWAY_API_URL;

// skickar en order till Order Service via gatewayen
export async function createOrder(orderRequest: OrderRequest) {
  const response = await fetch(`${API_BASE}/gateway/orders`, {
    method: "POST",
    credentials: "include", // skickar med gatewayens cookie
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderRequest),
  });

  // visar ett fel om ordern inte kunde skapas
  if (!response.ok) {
    throw new Error("Ordern kunde inte skapas!");
  }

  return response.json();
}
