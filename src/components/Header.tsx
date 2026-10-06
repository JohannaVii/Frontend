import { Link } from "react-router-dom";

type HeaderProps = {
  loggIn: boolean;
  onLogout: () => Promise<void>;
};
const Header = ({ loggIn, onLogout }: HeaderProps) => {
  //Hämtar användare och kollar om Role = Admin
  const userData = sessionStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

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
          {!loggIn && (
            <>
              <Link to="/products">Produkter</Link>
              {!loggIn && <Link to="/login">Logga in</Link>}
            </>
          )}

          {loggIn && (
            <>
              {isAdmin ? (
                <Link to="/adminPage">AdminProdukter</Link>
              ) : (
                <>
                  <Link to="/products">Produkter</Link>
                  <Link to="/shop">Kundvagn</Link>
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
