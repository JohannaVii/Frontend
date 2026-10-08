import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import { categories, type Category } from "../types/category";

const AdminProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError("Produkter kunde inte hämtas");
      }
    };

    fetchProducts();
  }, []);

  // översätter backends kategorinamn till svenska för visning på sidan
  const categoryNames: Record<Category, string> = {
    BRACELETS: "Armband",
    NECKLACES: "Halsband",
    EARRINGS: "Örhängen",
    RINGS: "Ringar",
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Admin - Produkter</h1>

      <div className="space-y-10">
        {categories.map((category) => {
          // hämtar produkterna som tillhör kategorin
          const categoryProducts = products.filter(
            (product) => product.category === category,
          );

          // visar inte kategorin om den inte har några produkter
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
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
};

export default AdminProductPage;
