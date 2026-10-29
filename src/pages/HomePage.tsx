import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="bg-[#fdfbf8]">
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

      <section className="mx-auto max-w-7xl px-16 py-20">
        <h2 className="mb-8 text-4xl font-medium text-gray-800">
          Våra kategorier
        </h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <Link
            to="/products?category=halsband"
            className="text-center text-gray-800"
          >
            <img
              src="/images/Necklace-home.png"
              alt="Halsband"
              className="aspect-square rounded-full object-cover"
            />
            <h3 className="mt-4 text-xl font-medium text-gray-800">Halsband</h3>
          </Link>

          <Link
            to="/products?category=armband"
            className="text-center text-gray-800"
          >
            <img
              src="/images/Bracelet-home.png"
              alt="Armband"
              className="aspect-square rounded-full object-cover"
            />
            <h3 className="mt-4 text-xl font-medium text-gray-800">Armband</h3>
          </Link>

          <Link
            to="/products?category=örhängen"
            className="text-center text-gray-800"
          >
            <img
              src="/images/Earrings-home.png"
              alt="Örhängen"
              className="aspect-square rounded-full object-cover"
            />
            <h3 className="mt-4 text-xl font-medium text-gray-800">Örhängen</h3>
          </Link>

          <Link
            to="/products?category=ringar"
            className="text-center text-gray-800"
          >
            <img
              src="/images/Ring-home.png"
              alt="Ringar"
              className="aspect-square rounded-full object-cover"
            />
            <h3 className="mt-4 text-xl font-medium text-gray-800">Ringar</h3>
          </Link>
        </div>
      </section>
    </main>
  );
}
