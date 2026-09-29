import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/authServer";

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    console.log("Du är inte inloggad!");
    return <Navigate to="/login" replace />;
  }
  console.log("Du är inloggad!");
  return <>{Outlet}</>;
};

export default ProtectedRoute;
