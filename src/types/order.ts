// beskriver en produkt i en order
export type OrderItemRequest = {
  productId: number;
  quantity: number;
};

// beskriver informationen som skickas till Order Service
export type OrderRequest = {
  items: OrderItemRequest[];
};

// beskriver en sparad produkt på en orderrad
export type OrderItemResponse = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

// beskriver en order som hämtas från backend
export type OrderResponse = {
  id: number;
  customerName: string;
  orderDate: string;
  items: OrderItemResponse[];
  totalPrice: number;
  paymentStatus: "PENDING" | "PAID" | "EXPIRED" | null;
};
