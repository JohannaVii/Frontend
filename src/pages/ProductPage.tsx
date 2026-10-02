import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  // här sparas produkterna som användaren har lagt i kundvagnen
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // bestämmer om kundvagnen ska synas eller inte
  const [showCart, setShowCart] = useState(false);

  // hämtar produkter från Product Service
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError("Produkter kunde inte hämtas.");
      }
    };

    fetchProducts();
  }, []);

  // funktionen körs när användaren klickar på "Lägg i kundvagnen"
  const addToCart = (product: Product) => {
    // leta efter produkten i kundvagnen
    const index = cartItems.findIndex((item) => item.id === product.id);

    // produkten finns inte i kundvagnen ännu
    if (index === -1) {
      // skapar en CartItem från produkten
      // alla produktens fält kopieras (...product) och quantity sätts till 1
      const newItem: CartItem = {
        ...product,
        quantity: 1,
      };

      // lägger till den nya produkten sist i kundvagnen
      setCartItems([...cartItems, newItem]);

      // bekräftelse att produkten lagts till
      alert(`${product.name} har lagts i kundvagnen`);
      return;
    }

    // produkten finns redan i kundvagnen
    const currentItem = cartItems[index];

    // kontrollera att antalet inte överstiger lagersaldot
    if (currentItem.quantity >= currentItem.stock) {
      alert("Det finns inte tillräckligt med produkter i lager.");
      return;
    }

    // kopierar kundvagnen och uppdaterar den valda produkten
    const updatedItems = [...cartItems];

    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1,
    };

    // sparar den uppdaterade kundvagnen
    setCartItems(updatedItems);

    alert(`${product.name} har lagts i kundvagnen`);
  };

  // ökar antalet av en produkt som redan finns i kundvagnen
  const increaseQuantity = (productId: number) => {
    // letar efter produkten i kundvagnen
    const index = cartItems.findIndex((item) => item.id === productId);

    if (index === -1) {
      return;
    }

    // hämtar produkten som ska uppdateras
    const currentItem = cartItems[index];

    // kontrollerar att antalet inte överstiger lagersaldot
    if (currentItem.quantity >= currentItem.stock) {
      alert("Det finns inte tillräckligt med produkter i lager.");
      return;
    }

    // kopierar kundvagnen och uppdaterar den valda produkten
    const updatedItems = [...cartItems];

    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1,
    };

    // sparar den uppdaterade kundvagnen
    setCartItems(updatedItems);
  };

  // minskar antalet av en produkt som redan finns i kundvagnen
  const decreaseQuantity = (productId: number) => {
    // letar efter produkten i kundvagnen
    const index = cartItems.findIndex((item) => item.id === productId);

    if (index === -1) {
      return;
    }

    // hämtar produkten som ska uppdateras
    const currentItem = cartItems[index];

    // kopierar kundvagnen
    const updatedItems = [...cartItems];

    // om antalet är 1 tas produkten bort från kundvagnen
    if (currentItem.quantity === 1) {
      updatedItems.splice(index, 1);
      setCartItems(updatedItems);
      return;
    }

    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity - 1,
    };

    // sparar den uppdaterade kundvagnen
    setCartItems(updatedItems);
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Produkter</h1>

      {error ? (
        <p>ERROR: {error}</p>
      ) : products.length === 0 ? (
        <p>Produktlistan är tom.</p>
      ) : (
        <div className="grid gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      )}

      {/* knapp som visar eller döljer kundvagnen */}
      <button
        onClick={() => setShowCart(!showCart)}
        className="mt-8 rounded-md px-4 py-2 font-medium shadow-sm"
      >
        {showCart ? "Dölj kundvagn" : "Visa kundvagn"}
      </button>

      {/* kundvagnen visas bara när showCart är true */}
      {showCart && (
        <div className="mt-8">
          <Cart
            items={cartItems}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
          />
        </div>
      )}
    </main>
  );
};

export default ProductPage;
