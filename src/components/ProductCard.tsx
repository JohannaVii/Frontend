import type { Product } from "../types/product";
import { Link } from "react-router-dom";

// vilken data ProductCard får
type ProductCardProps = {
  product: Product;
  // optional funktion, körs när användaren klickar på knappen
  onAdd?: (product: Product) => void;
};

const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* visar produktbilden om produkten har en imageUrl */}
      {/* saknas imageUrl blir villkoret falskt och <img>-elementet renderas inte alls */}
      {product.imageUrl && (
        <Link
          to={`/products/${product.id}`}
          className="flex h-80 items-center justify-center bg-[#f4f4f3] p-4"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </Link>
      )}

      <div className="p-5">
        {/*Länk till produkten via titeln*/}
        <Link
          className="mb-2 block font-serif text-2xl font-medium text-gray-800"
          to={`/products/${product.id}`}
        >
          {product.name}
        </Link>
        <p className="mb-4 text-sm text-slate-600">{product.description}</p>
        <p className="mb-1 font-medium">
          <b>Pris:</b> {product.price} kr
        </p>
        <p className="mb-4 text-sm text-slate-500">
          <b>Lagersaldo:</b> {product.stock}
        </p>

        {/* knappen visas bara om ProductPage skickar med onAdd */}
        {onAdd && (
          <button
            onClick={() => onAdd(product)}
            disabled={product.stock <= 0}
            className="rounded-md bg-pink-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300"
          >
            {product.stock <= 0 ? "Slut i lager" : "Lägg i kundvagnen"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
