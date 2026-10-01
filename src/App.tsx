import Header from "./components/Header";
import Footer from "./components/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ShopPage from "./pages/ShopPage";
import WelcomePage from "./pages/WelcomePage";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/products" element={<ProductPage />}></Route>

        {/* Sprint 2 - tomma sidor  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/orders" element={<OrderPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
