import * as authService from "./services/authServer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import WelcomePage from "./pages/WelcomePage";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import { useCallback, useState, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import type { LoginRequest, StoredUser } from "./types/auth";
import AdminProductPage from "./pages/AdminProductPage";
import AdminRoute from "./components/AdminRoute";
import type { CartItem } from "./types/cart";
import type { Product } from "./types/product";
import type { OrderRequest } from "./types/order";
import { createCheckoutOrder } from "./services/orderService";
import ProductCreatePage from "./pages/ProductCreatePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import HomePage from "./pages/HomePage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import CheckoutCancelPage from "./pages/CheckoutCancelPage";
import RegisterUserPage from "./pages/RegisterUserPage";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import CookieBanner from "./components/CookieBanner";
import CookiesPage from "./pages/CookiesPage";

const App = () => {
  // håller aktuell användare gemensamt för appens komponenter
  const [user, setUser] = useState<StoredUser | null>(null);

  // väntar tills Gateway har kontrollerat cookien
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // true medan betalningen startas, hindrar dubbelklick på "Skapa order"
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // håller reda på vilken sida användaren är på
  const location = useLocation();

  // kontrollerar inloggningen när appen startar eller laddas om
  useEffect(() => {
    let isMounted = true;

    const checkLogin = async () => {
      const user = await authService.restoreUser();

      // uppdaterar bara tillståndet om komponenten fortfarande finns kvar
      if (isMounted) {
        setUser(user);
        setIsCheckingAuth(false);
      }
    };

    void checkLogin();

    // förhindrar uppdatering om komponenten avmonteras
    return () => {
      isMounted = false;
    };
  }, []);

  // rensar meddelanden när användaren byter sida
  useEffect(() => {
    setMessage("");
    setErrorMessage("");
  }, [location.pathname]);

  // visar ett bekräftelsemeddelande och rensar tidigare fel
  const showMessage = (text: string) => {
    setMessage(text);
    setErrorMessage("");
  };

  // visar ett felmeddelande och rensar tidigare bekräftelser
  const showError = (text: string) => {
    setErrorMessage(text);
    setMessage("");
  };

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

  // tömmer kundvagnen både i React och i sessionStorage
  const handleCheckoutSuccess = useCallback(() => {
    setCartItems([]);
    sessionStorage.removeItem("cart");
  }, []);

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
    // en produkt som är slut i lager får inte läggas i kundvagnen
    if (product.stock <= 0) {
      showError("Produkten är slut i lager.");
      return;
    }

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
      showMessage(`${product.name} har lagts i kundvagnen`);
      return;
    }

    // produkten finns redan i kundvagnen
    const currentItem = cartItems[index];

    // kontrollera att antalet inte överstiger lagersaldot
    if (currentItem.quantity >= currentItem.stock) {
      showError("Det finns inte tillräckligt med produkter i lager.");
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

    showMessage(`${product.name} har lagts i kundvagnen`);
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
      showError("Det finns inte tillräckligt med produkter i lager.");
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
    // hindrar checkout om kundvagnen är tom
    if (cartItems.length === 0) {
      showError("Kundvagnen är tom.");
      return;
    }

    // hindrar dubbelklick medan en betalning redan startas
    if (isCheckingOut) {
      return;
    }

    // skapar informationen som ska skickas till Order Service
    const orderRequest = createOrderRequest();

    setIsCheckingOut(true);

    try {
      // skapar ordern och en Stripe Checkout-session via gatewayen
      const checkout = await createCheckoutOrder(orderRequest);

      // kontrollerar att Stripe har returnerat en betalningsadress
      if (!checkout.url) {
        throw new Error("Stripe returnerade ingen betalningsadress.");
      }

      // skickar kunden vidare till Stripes betalningssida
      window.location.href = checkout.url;
    } catch (error) {
      console.error("Checkout misslyckades:", error);
      showError("Det gick inte att starta betalningen. Försök igen.");
    } finally {
      // knappen aktiveras igen, även om kunden backar från Stripe
      setIsCheckingOut(false);
    }
  };

  // sparar användaren i appens gemensamma state efter inloggning
  const handleLogin = async (credentials: LoginRequest) => {
    const loggedInUser = await authService.login(credentials);
    setUser(loggedInUser);
  };

  // rensar användaren i appen när utloggningen lyckas
  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch {
      showError("Utloggningen misslyckades. Försök igen.");
    }
  };

  return (
    <>
      <Header
        loggIn={user !== null}
        onLogout={handleLogout}
        cartItemCount={cartItemCount}
      />

      {/* visar bekräftelsemeddelanden på en fast plats på skärmen */}
      {message && (
        <p
          role="status"
          className="fixed right-4 top-20 z-50 max-w-md rounded bg-green-100 p-3 text-green-800 shadow-md"
        >
          {message}
        </p>
      )}

      {/* visar felmeddelanden på en fast plats på skärmen */}
      {errorMessage && (
        <p
          role="alert"
          className="fixed right-4 top-20 z-50 max-w-md rounded bg-red-100 p-3 text-red-800 shadow-md"
        >
          {errorMessage}
        </p>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/products"
          element={<ProductPage onAddToCart={addToCart} />}
        />
        {/*Sidan kan endast nås om nvändaren är utloggad */}
        <Route
          element={
            <PublicOnlyRoute isLoggedIn={user !== null}></PublicOnlyRoute>
          }
        >
          <Route path="/register" element={<RegisterUserPage />}></Route>
        </Route>

        {/* sida som visas när kunden återvänder från Stripe */}
        <Route
          path="/checkout/success"
          element={
            <CheckoutSuccessPage onCheckoutSuccess={handleCheckoutSuccess} />
          }
        />

        <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
        <Route path="/cookies" element={<CookiesPage />} />

        {/* Visar detaljer för en specifik produkt */}
        <Route
          path="/products/:id"
          element={<ProductDetailPage onAddToCart={addToCart} />}
        />

        <Route
          element={<ProtectedRoute user={user} isLoading={isCheckingAuth} />}
        >
          <Route path="/welcome" element={<WelcomePage />} />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onCheckout={handleCheckout}
                isLoading={isCheckingOut}
              />
            }
          />
          <Route path="/orders" element={<OrderPage />} />
        </Route>

        {/*Sida skyddad från kunder */}
        <Route element={<AdminRoute user={user} isLoading={isCheckingAuth} />}>
          <Route path="/adminPage" element={<AdminProductPage />}></Route>
          <Route path="/createProduct" element={<ProductCreatePage />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      <Footer />
      <CookieBanner />
    </>
  );
};

export default App;
