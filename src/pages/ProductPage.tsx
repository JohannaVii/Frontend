import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [error, setError] = useState<string | null>(null);

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

  return (
    <main>
      <h1>ProductPage</h1>

      {error ? (
        <p>ERROR: {error}</p>
      ) : products.length === 0 ? (
        <p>Produktlistan är tom.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </main>
  );
};

export default ProductPage;
