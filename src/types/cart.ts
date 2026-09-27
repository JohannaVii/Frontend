import type { Product } from "./product";

// en produkt i kundvagnen
// produktens info + kvantitet
export type CartItem = Product & {
  quantity: number;
};
