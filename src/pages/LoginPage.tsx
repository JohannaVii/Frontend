import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { LoginRequest } from "../types/auth";

type LogginPageProps = {
  onLogin: (credentials: LoginRequest) => Promise<void>;
};

const LoginPage = ({ onLogin }: LogginPageProps) => {
  // sparar användarens e-postadress
  const [username, setUsername] = useState("");

  // sparar användarens lösenord
  const [password, setPassword] = useState("");

  // sparar ett felmeddelande om inloggningen misslyckas
  const [error, setError] = useState("");

  // visar att en inloggning pågår
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // hanterar inloggningen när formuläret skickas
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    // stoppar sidan från att laddas om
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // anropar Auth Server
      await onLogin({
        username,
        password,
      });

      // går till webbshoppen efter lyckad login
      navigate("/welcome", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ett oväntat fel inträffade.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // kopplar formuläret med onSubmit så funktionen körs när knappen klickas
    <main className="min-h-screen bg-[#fdfbf8] flex px-6 py-10">
      <div className="mx-auto max-w-md">
        <Link
          to="/"
          className="mb-8 inline-block text-base font-medium text-gray-700"
        >
          ← Tillbaka
        </Link>

        <h1 className="mb-8 text-4xl font-medium text-gray-800">Logga in</h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5 rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
          action="#"
          method="POST"
        >
          <label htmlFor="username" className="mb-1 block font-medium">
            E-post
          </label>

          <input
            id="username"
            type="email"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
            placeholder="name@gmail.com"
            className="w-full rounded-md border border-stone-400 bg-[#f4f4f3] px-4 py-3 focus:outline-none focus:border-gray-800"
          />

          <label htmlFor="password" className="mb-1 block font-medium">
            Lösenord
          </label>

          <input
            id="password"
            type="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Lösenord"
            className="w-full rounded-md border border-stone-400 bg-[#f4f4f3] px-4 py-3 focus:outline-none focus:border-gray-800"
          />

          {/* visa felmeddelande, om error innehåller text visas ett <p>, 
            annars om tomt visas inget. role="alert" - tillgänglighet, läser upp felmeddelandet direkt */}

          {error && (
            <p
              role="alert"
              className="rounded bg-red-100 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-pink-600 py-3 font-medium text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {loading ? "Loggar in..." : "Logga in"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
