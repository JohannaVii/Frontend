import { useState } from "react";
import Cart from "../components/Cart"; // komponenten som visar innehållet i kundvagnen
import type { CartItem } from "../types/cart"; // typen för en produkt i kundvagnen
import type { Product } from "../types/product"; // typen för en produkt från Product Service
import ProductCard from "../components/ProductCard"; // komponenten som visar en enskild produkt

// sidan håller reda på kundvagnen, skickar vidare information till andra komponenter
const ProductPage = () => {
  // här sparas produkterna som användaren har lagt i kundvagnen
  // cartItems = alla produkter som ligger i kundvagnen, från början tom ([])
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // bestämmer om kundvagnen ska synas eller inte
  // false = dold, true = visas
  const [showCart, setShowCart] = useState(false);

  // funktionen körs när användaren klickar på "Lägg i kundvagnen"
  const addToCart = (product: Product) => {
    // skapar en CartItem från produkten, produktens fält kopieras (...product)
    // och quantity sätts till 1
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };

    // tidigare produkter behålls
    // lägger till den nya CartItem sist i listan
    setCartItems((currentItems) => [...currentItems, cartItem]);

    // bekräftelse att produkten lagts till
    alert(`${product.name} har lagts i kundvagnen`);
  };

  // tillfällig produkt som tas bort när FE-11 är mergad,
  // då hämtas riktiga produkter från backend
  const tempProduct: Product = {
    id: 1,
    name: "Testprodukt",
    description: "Bara för test av FE-15",
    price: 100,
    stock: 50,
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">ProductPage</h1>

      {/* visar en produkt och skickar med funktionen addToCart */}
      <div className="mb-8 max-w-sm rounded-lg border p-6 shadow-sm">
        <ProductCard product={tempProduct} onAdd={addToCart} />
      </div>
      {/* knapp som visar eller döljer kundvagnen */}
      <button
        onClick={() => setShowCart(!showCart)}
        className="rounded-md px-4 py-2 font-medium shadow-sm"
      >
        {showCart ? "Dölj kundvagn" : "Visa kundvagn"}
      </button>

      {/* kundvagnen visas bara när showCart är true */}
      {showCart && (
        <div className="mt-8">
          <Cart items={cartItems} />
        </div>
      )}
    </main>
  );
};

export default ProductPage;
