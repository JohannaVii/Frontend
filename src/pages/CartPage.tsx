import Cart from "../components/Cart";
import type { CartItem } from "../types/cart";
import { Link } from "react-router-dom";

type CartPageProps = {
  cartItems: CartItem[];
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onCheckout: () => void;
  isLoading: boolean;
};

const CartPage = ({
  cartItems,
  onIncrease,
  onDecrease,
  onCheckout,
  isLoading,
}: CartPageProps) => {
  return (
    <main className="min-h-screen bg-[#fdfbf8] px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/products"
          className="mb-8 inline-block text-lg text-gray-700"
        >
          ← Fortsätt handla
        </Link>
        <h1 className="mb-8 font-serif text-3xl font-medium text-gray-800">
          Kundvagn
        </h1>

        <Cart
          items={cartItems}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onCheckout={onCheckout}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
};

export default CartPage;
