// beskriver en produkt i en order
export type OrderItemRequest = {
  productId: number;
  quantity: number;
};

// beskriver informationen som skickas till Order Service
export type OrderRequest = {
  items: OrderItemRequest[];
};
