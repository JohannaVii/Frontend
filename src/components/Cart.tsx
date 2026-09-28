import type { CartItem } from "../types/cart";

type CartProps = {
  items: CartItem[];
};

// visar antalet bara för att propen ska användas, kundvagnen visas inte ännu
const Cart = ({ items }: CartProps) => {
  return <div>Kundvagn ({items.length})</div>;
};

export default Cart;
