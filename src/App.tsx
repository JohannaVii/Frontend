import Header from "./components/Header";
import Footer from "./components/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ShopPage from "./pages/ShopPage";
import WelcomePage from "./pages/WelcomePage";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />

        {/* Sprint 2 - tomma sidor  */}
        <Route path="/shop" element={<WelcomePage />} />
        <Route path="/shop" element={<ProductPage />} />
        <Route path="/shop" element={<OrderPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
