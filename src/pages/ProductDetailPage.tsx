import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Product } from "../types/product";
import { categoryNames } from "../types/category";
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

      if (Number.isNaN(productId)) {
        setError("Produkten finns inte");
        setLoading(false);
        return; // lämnar funktionen, koden nedanför körs inte
      }

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
    <main className="min-h-screen bg-[#fdfbf8] px-6 py-10">
      <section className="grid grid-cols-1 gap-8 rounded-xl bg-white p-6 shadow-sm md:grid-cols-2">
        {/* Produktbild till vänster */}
        <div className="flex items-center justify-center rounded-lg bg-[#f4f4f3] p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-[450px] w-full object-contain"
          />
        </div>

        {/* Produktinformation till höger */}
        <div className="flex flex-col justify-center gap-4">
          <Link
            to="/products"
            className="mb-8 self-start text-base font-medium text-gray-700"
          >
            ← Tillbaka
          </Link>
          <h1 className="font-serif text-3xl font-medium text-gray-800">
            {product.name}
          </h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-sm text-gray-500">
            Kategori: {categoryNames[product.category]}
          </p>
          <p className="text-2xl font-semibold text-gray-800">
            {product.price} kr
          </p>
          <p className="text-sm text-gray-600">I lager: {product.stock} st</p>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="rounded-lg bg-pink-600 px-6 py-3 font-medium text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Lägg i kundvagn
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductDetailPage;
