import * as authService from "./services/authServer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import WelcomePage from "./pages/WelcomePage";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import { useState, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import type { LoginRequest } from "./types/auth";
import AdminProductPage from "./pages/AdminProductPage";
import AdminRoute from "./components/AdminRoute";
import type { CartItem } from "./types/cart";
import type { Product } from "./types/product";
import type { OrderRequest } from "./types/order";
import { createOrder } from "./services/orderService";
import ProductCreatePage from "./pages/ProductCreatePage";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(authService.isAuthenticated());

  // hämtar kundvagnen från sessionStorage när appen startar
  // om det inte finns någon sparad kundvagn börjar vi med en tom kundvagn
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = sessionStorage.getItem("cart");

    if (!savedCart) {
      // ingen sparad kundvagn finns, därför börjar man med en tom kundvagn
      return [];
    }

    // gör om texten från sessionStorage till JavaScript-data
    return JSON.parse(savedCart);
  });

  // räknar totalt antal varor i kundvagnen
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // sparar kundvagnen i sessionStorage varje gång cartItems ändras
  useEffect(() => {
    // gör om kundvagnen till text som kan sparas i sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // funktionen körs när användaren klickar på "Lägg i kundvagnen"
  const addToCart = (product: Product) => {
    // leta efter produkten i kundvagnen
    const index = cartItems.findIndex((item) => item.id === product.id);

    // produkten finns inte i kundvagnen ännu
    if (index === -1) {
      // skapar en CartItem från produkten
      // alla produktens fält kopieras (...product) och quantity sätts till 1
      const newItem: CartItem = {
        ...product,
        quantity: 1,
      };

      // lägger till den nya produkten sist i kundvagnen
      setCartItems([...cartItems, newItem]);

      // bekräftelse att produkten lagts till
      alert(`${product.name} har lagts i kundvagnen`);
      return;
    }

    // produkten finns redan i kundvagnen
    const currentItem = cartItems[index];

    // kontrollera att antalet inte överstiger lagersaldot
    if (currentItem.quantity >= currentItem.stock) {
      alert("Det finns inte tillräckligt med produkter i lager.");
      return;
    }

    // kopierar kundvagnen och uppdaterar den valda produkten
    const updatedItems = [...cartItems];

    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1,
    };

    // sparar den uppdaterade kundvagnen
    setCartItems(updatedItems);

    alert(`${product.name} har lagts i kundvagnen`);
  };

  // ökar antalet av en produkt som redan finns i kundvagnen
  const increaseQuantity = (productId: number) => {
    // letar efter produkten i kundvagnen
    const index = cartItems.findIndex((item) => item.id === productId);

    if (index === -1) {
      return;
    }

    // hämtar produkten som ska uppdateras
    const currentItem = cartItems[index];

    // kontrollerar att antalet inte överstiger lagersaldot
    if (currentItem.quantity >= currentItem.stock) {
      alert("Det finns inte tillräckligt med produkter i lager.");
      return;
    }

    // kopierar kundvagnen och uppdaterar den valda produkten
    const updatedItems = [...cartItems];

    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1,
    };

    // sparar den uppdaterade kundvagnen
    setCartItems(updatedItems);
  };

  // minskar antalet av en produkt som redan finns i kundvagnen
  const decreaseQuantity = (productId: number) => {
    // letar efter produkten i kundvagnen
    const index = cartItems.findIndex((item) => item.id === productId);

    if (index === -1) {
      return;
    }

    // hämtar produkten som ska uppdateras
    const currentItem = cartItems[index];

    // kopierar kundvagnen
    const updatedItems = [...cartItems];

    // om antalet är 1 tas produkten bort från kundvagnen
    if (currentItem.quantity === 1) {
      updatedItems.splice(index, 1);
      setCartItems(updatedItems);
      return;
    }

    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity - 1,
    };

    // sparar den uppdaterade kundvagnen
    setCartItems(updatedItems);
  };

  // skapar den information som ska skickas till Order Service
  const createOrderRequest = (): OrderRequest => {
    return {
      // varje produkt i kundvagnen blir en orderrad
      items: cartItems.map((item) => ({
        // skickar produktens id
        productId: item.id,

        // skickar hur många av produkten kunden vill köpa
        quantity: item.quantity,
      })),
    };
  };

  const handleCheckout = async () => {
    // skapar den information som ska skickas till Order Service
    const orderRequest = createOrderRequest();

    try {
      // skickar ordern till Order Service och väntar på svar
      await createOrder(orderRequest);

      // tömmer kundvagnen efter att ordern skapats
      setCartItems([]);

      // tar bort den sparade kundvagnen från sessionStorage
      sessionStorage.removeItem("cart");

      // vid fel så rensas inte sessionStorage
    } catch {
      // visar felmeddelande om ordern inte kunde skapas
      alert("Något gick fel när ordern skulle skapas!");
    }
  };

  const handleLogin = async (credentials: LoginRequest) => {
    await authService.login(credentials);
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    authService.logout();
    setLoggedIn(false);
  };

  return (
    <>
      <Header
        loggIn={loggedIn}
        onLogout={handleLogout}
        cartItemCount={cartItemCount}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/products"
          element={<ProductPage onAddToCart={addToCart} />}
        ></Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onCheckout={handleCheckout}
              />
            }
          />
          <Route path="/orders" element={<OrderPage />} />
        </Route>

        {/*Sida skyddad från kunder */}
        <Route element={<AdminRoute />}>
          <Route path="/adminPage" element={<AdminProductPage />}></Route>
          <Route path="/createProduct" element={<ProductCreatePage />}></Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
