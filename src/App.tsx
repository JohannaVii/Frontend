import Header from "./components/Header";
import Footer from "./components/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ShopPage from "./pages/ShopPage";
import WelcomePage from "./pages/WelcomePage";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import { useEffect } from "react";
// för att testa Order Service CORS config
import { testCors } from "./test/testOrder";

const App = () => {
  // testet körs bara en gång, när Appen startas
  useEffect(() => {
    testCors();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />

        {/* Sprint 2 - tomma sidor  */}
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/orders" element={<OrderPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
