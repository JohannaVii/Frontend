import { Link } from "react-router-dom";

type HeaderProps = {
  loggIn: boolean;
  onLogout: () => Promise<void>;
  cartItemCount: number;
};

const Header = ({ loggIn, onLogout, cartItemCount }: HeaderProps) => {
  // Hämtar användaren från sessionStorage och kontrollerar om rollen är ADMIN
  const userData = sessionStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#faf7f2] shadow-sm">
      <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
        <Link
          to="/"
          className="font-serif text-4xl text-stone-900 no-underline"
        >
          KJPJ
        </Link>
        <nav
          className="flex items-center gap-8 text-base font-normal tracking-wide"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {!loggIn && (
            <>
              <Link to="/products">Produkter</Link>
              <Link to="/login">Logga in</Link>
              <Link to="/register">Skapa konto</Link>
            </>
          )}

          {loggIn && (
            <>
              {isAdmin ? (
                <>
                  <Link to="/adminPage">Admin produkter</Link>
                  <Link to="/createProduct">Skapa produkt</Link>
                </>
              ) : (
                <>
                  <Link to="/products">Produkter</Link>
                  <Link to="/cart" className="flex items-center gap-2">
                    <img
                      src="/images/cart-icon.png"
                      alt="Kundvagn"
                      className="h-5 w-5 object-contain"
                    />
                    <span>Kundvagn</span>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-xs font-medium text-white">
                      {cartItemCount}
                    </span>
                  </Link>
                  <Link to="/orders">Ordrar</Link>
                </>
              )}

              <Link to="/login" onClick={onLogout}>
                Logga ut
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
