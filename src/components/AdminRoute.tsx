import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/authServer";

const AdminRoute = () => {
  if (!isAuthenticated()) {
    console.log("Du är inte inloggad!");
    return <Navigate to="/login" replace />;
  }

  const userData = sessionStorage.getItem("user");

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userData);

  console.log("ADMIN ROUTE USER:", user);
  console.log("ROLES:", user?.roles);
  console.log(
    "IS ADMIN:",
    user?.roles?.includes("ROLE_ADMIN")
  );

  if (!user?.roles?.includes("ROLE_ADMIN")) {
    console.log("Inte admin - skickar till products");
    return <Navigate to="/products" replace />;
  }

  console.log("Admin godkänd!");
  return <Outlet />;
};

export default AdminRoute;