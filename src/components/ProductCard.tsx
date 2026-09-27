import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return <div>{product.name}</div>;
};

export default ProductCard;
