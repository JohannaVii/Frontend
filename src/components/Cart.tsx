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
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-3 text-2xl font-semibold">Kundvagnen är tom</h2>
        <p className="text-slate-600">
          Lägg till produkter för att fortsätta handla.
        </p>
      </section>
    );
  }

  // räknar ut totalpriset för hela kundvagnen
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-2xl font-semibold">Din kundvagn</h2>

      {/* visar hur många produkter som finns i kundvagnen */}
      <p className="mb-6 text-sm text-slate-500">
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
            <li
              key={item.id}
              className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              {/* visar produktbilden */}
              <div className="flex h-28 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="px-2 text-center text-sm text-slate-400">
                    Ingen bild
                  </span>
                )}
              </div>

              {/* visar information om produkten */}
              <div className="min-w-0 flex-1">
                {/* visar produktens namn */}
                <p className="font-semibold">{item.name}</p>

                {/* pris per produkt */}
                <p className="mt-1 text-sm text-slate-600">
                  Pris: {item.price} kr
                </p>

                {/* knappar för att ändra antalet */}
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => onDecrease(item.id)}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1 font-semibold hover:bg-slate-100"
                  >
                    -
                  </button>

                  <span className="min-w-6 text-center font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => onIncrease(item.id)}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1 font-semibold hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* visar totalpriset för just denna produkt */}
              {/* visar totalpriset för just denna produkt */}
              <p className="shrink-0 self-end font-medium">{lineTotal} kr</p>
            </li>
          );
        })}
      </ul>

      {/* visar totalpriset för hela kundvagnen */}
      <div className="mt-6 border-t border-slate-200 pt-5">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">Totalt</p>
          <p className="text-xl font-bold">{totalPrice} kr</p>
        </div>

        {/* knapp för att skicka kundvagnen som en order */}
        <button
          onClick={onCheckout}
          className="mt-5 w-full rounded-md bg-pink-500 px-4 py-3 font-semibold text-white shadow-sm hover:bg-pink-600"
        >
          Skapa order
        </button>
      </div>
    </section>
  );
};

export default Cart;
