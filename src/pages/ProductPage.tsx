import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import { categories } from "../types/category";

type ProductPageProps = {
  onAddToCart: (product: Product) => void;
};

// visar produkterna och skickar vidare funktionen för att lägga i kundvagnen
const ProductPage = ({ onAddToCart }: ProductPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  // översätter backends kategorinamn till svenska för visning på sidan
  // Record - att man skapar ett objekt där varje kategori är en textnyckel
  // som har ett textvärde
  const categoryNames: Record<string, string> = {
    BRACELETS: "Armband",
    NECKLACES: "Halsband",
    EARRINGS: "Örhängen",
    RINGS: "Ringar",
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Produkter</h1>

      {error ? (
        <p>ERROR: {error}</p>
      ) : products.length === 0 ? (
        <p>Produktlistan är tom.</p>
      ) : (
        <div className="space-y-10">
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.category === category,
            );

            // visa inte kategorin om den inte har några produkter
            if (categoryProducts.length === 0) {
              return null;
            }

            return (
              <section key={category}>
                <h2 className="mb-5 text-2xl font-semibold">
                  {/* visar kategorinamnet på svenska */}
                  {categoryNames[category]}
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAdd={onAddToCart}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default ProductPage;
