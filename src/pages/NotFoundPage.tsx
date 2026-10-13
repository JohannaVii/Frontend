import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <section
        className="
            w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg"
      >
        <p className="mt-4 text-6xl font-bold">404</p>
        <h1 className="mt-4 text-2xl font-bold text-red-600">
          Sidan kunde inte hittas!
        </h1>
        <p className="mt-4 leading-7 text-slate-500">
          Sidan du letar efter finns inte eller så har adressen blivit fel
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-teal-600 px-6 py-3 font-medium text-white hover:bg-teal-700"
        >
          Tillbaka till startsidan
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
