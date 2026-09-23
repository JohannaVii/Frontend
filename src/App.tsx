import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import ShopPage from "./pages/ShopPage";

const App = () => {


  return (
    // Navigate skickar användaren från / till /login
    // visa LoginPage
    // visa ShopPage
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/shop" element={<ShopPage />} />
    </Routes>
  );
};

export default App;
