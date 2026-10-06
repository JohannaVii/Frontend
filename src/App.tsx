import * as authService from "./services/authServer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ShopPage from "./pages/ShopPage";
import WelcomePage from "./pages/WelcomePage";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import { useEffect, useState } from "react";
// för att testa Order Service CORS config
import { testCors } from "./test/testOrder";
import ProtectedRoute from "./components/ProtectedRoute";
import type { LoginRequest } from "./types/auth";
import AdminProductPage from "./pages/AdminProductPage";
import AdminRoute from "./components/AdminRoute";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(authService.isAuthenticated());

  const handleLogin = async (credentials: LoginRequest) => {
    await authService.login(credentials);
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    authService.logout();
    setLoggedIn(false);
  };

  // testet körs bara en gång, när Appen startas
  useEffect(() => {
    testCors();
  }, []);

  return (
    <>
      <Header loggIn={loggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/products" element={<ProductPage />}></Route>

        {/* Sprint 2 - tomma sidor  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/orders" element={<OrderPage />} />
        </Route>

        {/*Sida skyddad från kunder */}
        <Route element={<AdminRoute />}>
          <Route path="/adminPage" element={<AdminProductPage />}></Route>
        </Route>
        
      </Routes>
      <Footer />
    </>
  );
};

export default App;
