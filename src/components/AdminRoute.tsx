import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/authServer";

const AdminRoute = () => {
  if (!isAuthenticated()) {
    {/*Om användaren inte är inloggad skickas den till Logga in sidan*/}
    return <Navigate to="/login" replace />;
  }

  const userData = sessionStorage.getItem("user");

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userData);

  if (!user?.roles?.includes("ROLE_ADMIN")) {
    {/*Om inloggaren inte är admin så skickas den till products*/}
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;