import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Product } from "../types/product";
import { getProductById } from "../services/productService";

type ProductDetailPageProps = {
  onAddToCart: (product: Product) => void;
};

function ProductDetailPage({ onAddToCart }: ProductDetailPageProps) {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //Effekten körs när värdet på id ändras och sidan visas första gången
  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError("");

      const productId = Number(id);

      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch {
        setError("Kunde inte hämta produkten");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <p>Laddar produkt...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Produkten du söker kunde inte hämtas eller finns inte</p>;
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <section className="grid grid-cols-1 gap-8 rounded-xl bg-white p-6 shadow-sm md:grid-cols-2">
        {/* Produktbild till vänster */}
        <div className="flex items-center justify-center rounded-lg bg-slate-50 p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-[450px] w-full object-contain"
          />
        </div>

        {/* Produktinformation till höger */}
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-3xl font-bold text-slate-900">
            {product.name}
            </h1>
          <p className="text-slate-600">
            {product.description}
            </p>
          <p className="text-sm text-slate-500">
            Kategori: {product.category}
            </p>
          <p className="text-2xl font-semibold">
            {product.price} kr
            </p>
          <p className="text-sm text-slate-600">
            I lager: {product.stock} st
            </p>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="rounded-lg bg-pink-500 px-6 py-3 font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Lägg i kundvagn
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductDetailPage;
