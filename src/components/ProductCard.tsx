import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  onAdd?: (product: Product) => void;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>
        <b>Pris:</b> {product.price} kr
      </p>
      <p>
        <b>Lagersaldo:</b> {product.stock}
      </p>
    </div>
  );
};

export default ProductCard;
