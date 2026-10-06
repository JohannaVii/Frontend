import Cart from "../components/Cart";
import type { CartItem } from "../types/cart";

type CartPageProps = {
  cartItems: CartItem[];
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onCheckout: () => void;
};

const CartPage = ({
  cartItems,
  onIncrease,
  onDecrease,
  onCheckout,
}: CartPageProps) => {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Kundvagn</h1>

      <Cart
        items={cartItems}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onCheckout={onCheckout}
      />
    </main>
  );
};

export default CartPage;
