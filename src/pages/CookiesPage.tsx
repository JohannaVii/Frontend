import { Link } from "react-router-dom";

// förklarar vilka cookies som används och varför
const CookiesPage = () => {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <Link
        to="/"
        className="mb-8 inline-block text-base font-medium text-gray-700"
      >
        ← Tillbaka
      </Link>

      <h1 className="mb-6 text-3xl font-medium text-gray-800">
        Information om cookies
      </h1>

      <p className="mb-4 text-gray-700">
        Webbshoppen använder en nödvändig cookie för att du ska kunna logga in
        och använda tjänsten på ett säkert sätt.
      </p>

      <h2 className="mb-2 text-xl font-medium text-gray-800">
        Inloggningscookie
      </h2>
      <ul className="mb-4 list-disc space-y-1 pl-6 text-gray-700">
        <li>
          <b>Namn:</b> access_token
        </li>
        <li>
          <b>Syfte:</b> håller dig inloggad och identifierar dig vid anrop till
          webbshoppens tjänster.
        </li>
        <li>
          <b>Typ:</b> HttpOnly, vilket innebär att den inte kan läsas av
          JavaScript i webbläsaren.
        </li>
        <li>
          <b>Livslängd:</b> tills inloggningen går ut eller du loggar ut.
        </li>
      </ul>

      <p className="text-gray-700">
        Cookien är nödvändig för att inloggningen ska fungera och används inte
        för spårning eller marknadsföring. Därför behövs inget samtycke.
        Webbläsaren sparar även din kundvagn och information om att du stängt
        cookie-informationen, men de innehåller inga inloggningsuppgifter.
      </p>
    </main>
  );
};

export default CookiesPage;
