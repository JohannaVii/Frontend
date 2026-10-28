import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import { categories, categoryNames, type Category } from "../types/category";

const AdminProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alla");

  const categoryOptions: ("Alla" | Category)[] = ["Alla", ...categories];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Alla" || product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="min-h-screen bg-[#fdfbf8] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/products"
          className="mb-8 inline-block text-base font-medium text-gray-700"
        >
          ← Tillbaka
        </Link>
        <h1 className="mb-8 text-4xl font-medium">Admin - Produkter</h1>

        <div className="mb-6">
          <input
            id="search"
            type="text"
            value={searchTerm}
            placeholder="Sök efter produkter..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="category" className="mr-2">
            Kategori
          </label>

          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category === "Alla" ? "Alla" : categoryNames[category]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-10">
          {categories.map((category) => {
            // hämtar produkterna som tillhör kategorin
            const categoryProducts = filteredProducts.filter(
              (product) => product.category === category,
            );

            // visar inte kategorin om den inte har några produkter
            if (categoryProducts.length === 0) {
              return null;
            }

            return (
              <section key={category}>
                <h2 className="mb-5 text-3xl font-medium text-gray-800">
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
      </div>
    </main>
  );
};

export default AdminProductPage;
