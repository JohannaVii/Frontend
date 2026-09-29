import type { Product } from "../types/product";

// vilken data ProductCard får
type ProductCardProps = {
  product: Product;
  // optional funktion, körs när användaren klickar på knappen
  // optional gör att ProductCard fungerar både i FE-11 och FE-15
  onAdd?: (product: Product) => void;
};

const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">{product.name}</h3>

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
  );
};

export default ProductCard;
