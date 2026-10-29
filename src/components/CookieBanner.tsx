import { useState } from "react";
import { Link } from "react-router-dom";

const DISMISSED_KEY = "cookieInfoDismissed";

// Kontrollerar om bannern har stängts under den aktuella sessionen
const wasDismissed = (): boolean => {
  try {
    return sessionStorage.getItem(DISMISSED_KEY) === "true";
  } catch {
    return false;
  }
};

const CookieBanner = () => {
  const [visible, setVisible] = useState(() => !wasDismissed());

  // Döljer bannern och sparar stängningen under sessionen
  const handleClose = () => {
    setVisible(false);

    try {
      sessionStorage.setItem(DISMISSED_KEY, "true");
    } catch {
      // Bannern döljs tills komponenten monteras om
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <aside
      role="region"
      aria-label="Information om cookies"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-lg"
    >
      <p>
        Vi använder en nödvändig HttpOnly-cookie för inloggning och säker
        åtkomst. Den krävs för att webbshoppen ska fungera och används inte för
        spårning eller marknadsföring.{" "}
        <Link to="/cookies" className="font-medium underline">
          Läs mer
        </Link>
      </p>

      <button
        type="button"
        onClick={handleClose}
        className="mt-3 rounded-md border border-slate-300 px-3 py-1 font-medium hover:bg-slate-100"
      >
        Stäng
      </button>
    </aside>
  );
};

export default CookieBanner;
