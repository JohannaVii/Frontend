import { Link } from "react-router-dom";

// visar ett meddelande när kunden inte slutför betalningen
const CheckoutCancelPage = () => {
  return (
    <main className="min-h-screen bg-[#fdfbf8] px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-5xl text-gray-500" aria-hidden="true">
          ×
        </div>

        <h1 className="mb-4 font-serif text-3xl font-medium text-gray-800">
          Betalningen slutfördes inte!
        </h1>

        <p className="mb-6 text-gray-600">
          Din betalning har inte slutförts. Du kan gå tillbaka till kundvagnen
          och försöka igen.
        </p>

        <Link
          to="/cart"
          className="inline-block rounded-md bg-pink-600 px-6 py-3 font-medium text-white transition hover:bg-pink-700"
        >
          Tillbaka till kundvagnen
        </Link>
      </div>
    </main>
  );
};

export default CheckoutCancelPage;
