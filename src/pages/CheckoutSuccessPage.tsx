import { useEffect } from "react";
import { Link } from "react-router-dom";

// tar emot funktionen som tömmer kundvagnen i App.tsx
type CheckoutSuccessPageProps = {
  onCheckoutSuccess: () => void;
};

// visar en bekräftelse när kunden kommer tillbaka från Stripe
const CheckoutSuccessPage = ({
  onCheckoutSuccess,
}: CheckoutSuccessPageProps) => {
  // tömmer kundvagnen efter att kunden kommit tillbaka från betalningen
  useEffect(() => {
    onCheckoutSuccess();
  }, [onCheckoutSuccess]);

  return (
    <main className="min-h-screen bg-[#fdfbf8] px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-5xl text-green-600" aria-hidden="true">
          ✓
        </div>

        <h1 className="mb-4 font-serif text-3xl font-medium text-gray-800">
          Betalningen lyckades!
        </h1>

        <p className="mb-3 text-gray-600">Tack för ditt köp.</p>

        <p className="mb-6 text-gray-600">
          Du kan gå till dina ordrar för att se din orderhistorik
        </p>

        <Link
          to="/orders"
          className="inline-block rounded-md bg-pink-600 px-6 py-3 font-medium text-white transition hover:bg-pink-700"
        >
          Visa mina ordrar
        </Link>
      </div>
    </main>
  );
};

export default CheckoutSuccessPage;
