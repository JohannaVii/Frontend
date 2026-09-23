import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authServer";

const LoginPage = () => {
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
      await login({
        username,
        password,
      });

      // går till webbshoppen efter lyckad login
      navigate("/shop", { replace: true });
    } catch {
      setError("Fel användarnamn eller lösenord!");
    } finally {
      setLoading(false);
    }
  };

  return (
    // kopplar formuläret med onSubmit så funktionen körs när knappen klickas
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">
          Logga in
        </h1>

        <p className="mb-8 text-center text-slate-500">
          Logga in för att komma till webbshoppen.
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
          action="#"
          method="POST"
        >
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            E-post
          </label>

          <input
            id="username"
            type="email"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
            placeholder="name@gmail.com"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Lösenord
          </label>

          <input
            id="password"
            type="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Lösenord"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* visa felmeddelande, om error innehåller text visas ett <p>, 
            annars om tomt visas inget. role="alert" - tillgänglighet, läser upp felmeddelandet direkt */}

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-teal-600 py-3 font-medium text-white hover:bg-teal-700"
          >
            {loading ? "Loggar in..." : "Logga in"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
