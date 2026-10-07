import type { Product } from "../types/product";

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
        <div className="flex h-80 items-center justify-center bg-slate-50 p-2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <div className="p-5">
        <h3 className="mb-2 text-xl font-semibold">{product.name}</h3>
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
            className="rounded-md px-4 py-2 font-medium shadow-sm"
          >
            Lägg i kundvagnen
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
