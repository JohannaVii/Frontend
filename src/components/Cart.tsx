import type { CartItem } from "../types/cart";

// props som Cart-komponenten tar emot
type CartProps = {
  // kundvagnens produkter
  items: CartItem[];
  // funktion som ökar quantity
  onIncrease: (productId: number) => void;
  // funktion som minskar quantity
  onDecrease: (productId: number) => void;
  // funktion som skickar kundvagnen som en order
  onCheckout: () => void;
};

// visar kundvagnen
const Cart = ({ items, onIncrease, onDecrease, onCheckout }: CartProps) => {
  // om kundvagnen är tom visas ett meddelande
  if (items.length === 0) {
    return (
      <section className="max-w-md rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold">Kundvagn</h2>
        <p className="text-gray-600">Kundvagnen är tom</p>
      </section>
    );
  }

  // räknar ut totalpriset för hela kundvagnen
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="max-w-md rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">Kundvagn</h2>

      {/* visar hur många produkter som finns i kundvagnen */}
      <p className="mb-4 text-sm text-gray-600">
        Antal produkter: {items.length}
      </p>

      {/* visar alla produkter som finns i kundvagnen */}
      <ul className="space-y-4">
        {/* går igenom listan och visar varje produkt */}
        {items.map((item) => {
          // räknar ut priset för alla av samma produkt
          const lineTotal = item.price * item.quantity;

          return (
            // React behöver ett unikt id för varje rad
            <li key={item.id} className="rounded-lg border bg-gray-50 p-4">
              {/* visar produktens namn */}
              <p className="font-semibold">{item.name}</p>

              {/* pris per produkt */}
              <p className="mt-1 text-sm text-gray-600">
                Pris: {item.price} kr
              </p>

              {/* knappar för att ändra antalet */}
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => onDecrease(item.id)}
                  className="rounded-md border px-3 py-1 font-semibold hover:bg-gray-100"
                >
                  -
                </button>

                <span className="min-w-6 text-center font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() => onIncrease(item.id)}
                  className="rounded-md border px-3 py-1 font-semibold hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* visar totalpriset för just denna produkt */}
              <p className="mt-3 font-medium">Summa: {lineTotal} kr</p>
            </li>
          );
        })}
      </ul>

      {/* visar totalpriset för hela kundvagnen */}
      <div className="mt-6 border-t pt-4">
        <p className="text-lg font-bold">Totalt: {totalPrice} kr</p>
      </div>

      {/* knapp för att skicka kundvagnen som en order */}
      <button
        onClick={onCheckout}
        className="mt-4 rounded-md px-4 py-2 font-medium shadow-sm"
      >
        Skapa order
      </button>
    </section>
  );
};

export default Cart;
