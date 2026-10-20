import { Navigate, Outlet } from "react-router-dom";
import type { StoredUser } from "../types/auth";

type ProtectedRouteProps = {
  user: StoredUser | null;
  isLoading: boolean;
};

const ProtectedRoute = ({ user, isLoading }: ProtectedRouteProps) => {
  // väntar tills Gateway har kontrollerat cookien
  if (isLoading) {
    return <p>Kontrollerar inloggning...</p>;
  }

  // skickar utloggade användare till inloggningssidan
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // visar sidan om användaren är inloggad
  return <Outlet />;
};

export default ProtectedRoute;
