import { isAuthenticated, logout } from "../services/authServer";
import { Link } from "react-router-dom";

type HeaderProps = {
  loggIn: boolean;
  onLogout: () => Promise<void>;
}
const Header = ({loggIn, onLogout}: HeaderProps) => {

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
        <h1
          className="text-4xl text-pink-500"
          style={{ fontFamily: "Quicksand" }}
        >
          KJPJ
        </h1>
        <nav className="flex gap-6">
          <Link to="/products">Produkter</Link>

          {!loggIn && <Link to="/login">Logga in</Link>}

          {loggIn && (
            <>
              <Link to="/shop">Kundvagn</Link>
              <Link to="/orders">Ordrar</Link>
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
