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
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };

    setCartItems((currentItems) => [...currentItems, cartItem]);

    alert(`${product.name} har lagts i kundvagnen`);
  };
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">ProductPage</h1>

      {error ? (
        <p>ERROR: {error}</p>
      ) : products.length === 0 ? (
        <p>Produktlistan är tom.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))
      )}

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
