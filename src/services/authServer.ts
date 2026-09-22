import type { LoginRequest, TokenResponse } from "../types/auth";

// URL till Auth Server från .env.local
const API_BASE = import.meta.env.VITE_AUTH_API_URL;

// nyckeln som används för att spara JWT-token i sessionStorage
const TOKEN_KEY = "access_token";

// skickar användarnamn och lösenord till Auth Server
// returnerar inloggningssvaret med accessToken, expiresIn, subject och roller
export async function login(credentials: LoginRequest): Promise<TokenResponse> {
  // läser inloggningssvaret från Auth Server
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // gör om LoginRequest-objektet till JSON innan det skickas till backend
    body: JSON.stringify(credentials),
  });

  // om Auth Server svarar med ett fel (t ex 401) kastas ett felmeddelande
  if (!response.ok) {
    throw new Error("Fel användarnamn eller lösenord!");
  }

  // läser JSON-svaret från Auth Server och sparar det som ett TokenResponse-objekt
  const data: TokenResponse = await response.json();

  // sparar accessToken i sessionStorage så att frontend kan använda den senare
  sessionStorage.setItem(TOKEN_KEY, data.accessToken);

  // returnerar inloggningssvaret till komponenten som anropar login()
  return data;
}

// förberett inför kommande tasks i nästa sprint

// tar bort användarens sparade token vid utloggning
export function logout() {
  sessionStorage.removeItem(TOKEN_KEY);
}

// hämtar sparad accessToken från sessionStorage
// null returneras om ingen användare är inloggad
export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

// kontrollerar om det finns en sparad accessToken
// används för att avgöra om användaren är inloggad
export function isAuthenticated() {
  return getToken() !== null;
}
