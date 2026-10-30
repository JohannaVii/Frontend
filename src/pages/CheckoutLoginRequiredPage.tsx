import { Link } from "react-router-dom";

// visar ett meddelande när kunden försöker skapa en order utan att vara inloggad
const CheckoutLoginRequiredPage = () => {
  return (
    <main className="min-h-screen bg-[#fdfbf8] px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-5xl text-gray-500" aria-hidden="true">
          ×
        </div>

        <h1 className="mb-4 font-serif text-3xl font-medium text-gray-800">
          Du måste vara inloggad!
        </h1>

        <p className="mb-6 text-gray-600">
          För att slutföra köpet måste du vara inloggad.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/login"
            className="font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Logga in
          </Link>
          <span className="text-gray-400">|</span>

          <Link
            to="/register"
            className="font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Skapa konto
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CheckoutLoginRequiredPage;
