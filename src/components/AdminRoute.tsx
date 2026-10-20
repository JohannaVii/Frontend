import { Navigate, Outlet } from "react-router-dom";
import type { StoredUser } from "../types/auth";

type AdminRouteProps = {
  user: StoredUser | null;
  isLoading: boolean;
};

const AdminRoute = ({ user, isLoading }: AdminRouteProps) => {
  // Väntar tills Gateway har kontrollerat cookien
  if (isLoading) {
    return <p>Kontrollerar inloggning...</p>;
  }

  // skickar utloggade användare till inloggningssidan
  if (!user) {
    {
      /*Om användaren inte är inloggad skickas den till Logga in sidan*/
    }
    return <Navigate to="/login" replace />;
  }

  // skickar kunder som inte är administratörer till produktsidan
  if (!user?.roles?.includes("ROLE_ADMIN")) {
    {
      /*Om inloggaren inte är admin så skickas den till products*/
    }
    return <Navigate to="/products" replace />;
  }

  // visar adminsidan för administratörer
  return <Outlet />;
};

export default AdminRoute;
