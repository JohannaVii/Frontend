import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fdfbf8] px-4 py-12">
      <section
        className="
            w-full max-w-lg rounded-xl border border-stone-200 bg-white p-8 text-center shadow-sm"
      >
        <p className="mt-4 font-serif text-6xl font-bold text-gray-800">404</p>
        <h1 className="mt-4 font-serif text-2xl font-medium text-gray-800">
          Sidan kunde inte hittas!
        </h1>
        <p className="mt-4 leading-7 text-gray-600">
          Sidan du letar efter finns inte eller så har adressen blivit fel
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-pink-600 px-6 py-3 font-medium text-white hover:bg-pink-700"
        >
          Tillbaka till startsidan
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
