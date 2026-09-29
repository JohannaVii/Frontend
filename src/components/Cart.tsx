import type { CartItem } from "../types/cart";

// props som Cart-komponenten tar emot
type CartProps = {
  items: CartItem[];
};

// visar kundvagnen
const Cart = ({ items }: CartProps) => {
  return (
    <section className="max-w-sm rounded-lg border p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-semibold">Kundvagn</h2>

      {/* visar hur många produkter som finns i kundvagnen */}
      <p className="mb-4">Antal produkter: {items.length}</p>

      {/* visar alla produkter som finns i kundvagnen */}
      <ul className="space-y-2">
        {/* går igenom listan och visar varje produkt */}
        {items.map((item) => (
          // React behöver ett unikt id för varje rad
          <li key={item.id} className="rounded border p-2">
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Cart;
