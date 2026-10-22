import type { OrderRequest, OrderResponse } from "../types/order";

// hämtar gatewayens URL från .env.local
const API_BASE = import.meta.env.VITE_GATEWAY_API_URL;

// skickar en vanlig order till Order Service via gatewayen
export async function createOrder(orderRequest: OrderRequest) {
  const response = await fetch(`${API_BASE}/gateway/orders`, {
    method: "POST",
    credentials: "include", // Skickar med gatewayens HttpOnly-cookie.
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

// skapar en order och en Stripe Checkout-session via gatewayen
export async function createCheckoutOrder(orderRequest: OrderRequest) {
  const response = await fetch(`${API_BASE}/gateway/orders/checkout`, {
    method: "POST",
    credentials: "include", // skickar med gatewayens HttpOnly-cookie
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderRequest),
  });

  // visar ett fel om checkout-sessionen inte kunde skapas
  if (!response.ok) {
    throw new Error("Det gick inte att starta betalningen!");
  }

  // innehåller bland annat orderId, sessionId och url
  return response.json() as Promise<{
    orderId: number;
    sessionId: string;
    url: string;
  }>;
}

// Hämtar den inloggade kundens ordrar via gatewayen.
export async function getCustomerOrders(): Promise<OrderResponse[]> {
  const response = await fetch(`${API_BASE}/gateway/orders`, {
    method: "GET",
    credentials: "include", // Skickar med HttpOnly-cookien.
  });

  // Hanterar fel om ordrarna inte kan hämtas.
  if (!response.ok) {
    throw new Error("Kunde inte hämta dina ordrar.");
  }

  // Returnerar kundens ordrar från backend.
  return response.json() as Promise<OrderResponse[]>;
}
