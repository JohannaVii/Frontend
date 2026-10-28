import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="bg-stone-50">
      <section className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden md:grid-cols-2">
        <div className="h-[550px]">
          <img
            src="/images/hero-jewelry.png"
            alt="Smycken från KJPJ"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex h-[550px] flex-col items-start justify-center bg-[#f6dddd]  px-12 md:px-16">
          <h1 className="text-5xl font-medium leading-tight text-gray-800">
            Smycken för varje tillfälle
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            Upptäck vårt sortiment av armband, halsband, örhängen och ringar.
          </p>

          <Link
            to="/products"
            className="mt-8 rounded-md bg-pink-600 px-7 py-3 font-semibold text-white transition hover:bg-pink-700"
          >
            Se alla smycken
          </Link>
        </div>
      </section>
    </main>
  );
}
