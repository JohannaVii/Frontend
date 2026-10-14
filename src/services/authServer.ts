import type { LoginRequest, LoginResponse } from "../types/auth";

// URL till Gateway från .env.local
const API_BASE = import.meta.env.VITE_GATEWAY_API_URL;

// nyckel för användarinformation,inte JWT-token
const USER_KEY = "user";

// loggar in via gatewayen och låter webbläsaren hantera cookien
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE}/gateway/auth/login`, {
      method: "POST",
      credentials: "include", // tar emot och skickar med cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // fel användarnamn eller lösenord
    if (response.status === 401 || response.status === 403) {
      throw new Error("Fel användarnamn eller lösenord!");
    }

    // något gick fel i Auth Server
    if (response.status >= 500) {
      throw new Error("Serverfel. Försök igen senare.");
    }

    // övriga fel från backend
    if (!response.ok) {
      throw new Error("Inloggningen misslyckades!");
    }

    // läser användarinformationen, inte JWT-token
    const data: LoginResponse = await response.json();

    // sparar användarinformation så att WelcomePage kan visa den
    sessionStorage.setItem(USER_KEY, JSON.stringify(data));

    // returnerar inloggningssvaret till komponenten som anropar login()
    return data;

    // körs om Auth Server inte går att nå, inget svar alls
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Kan inte ansluta till servern. Kontrollera att servern är igång.",
      );
    }
    throw error;
  }
}

// loggar ut via gatewayen och ber webbläsaren att ta bort cookien
export async function logout(): Promise<void> {
  const response = await fetch(`${API_BASE}/gateway/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Utloggningen misslyckades!");
  }

  // tar bort den sparade användarinformationen
  sessionStorage.removeItem(USER_KEY);
}

// hämtar sparad användarinformation för frontend
export function getUser(): LoginResponse | null {
  const userData = sessionStorage.getItem(USER_KEY);

  return userData ? (JSON.parse(userData) as LoginResponse) : null;
}

// kontrollerar om frontend har sparad användarinformation
// detta bevisar inte att cookien fortfarande är giltig
export function isAuthenticated(): boolean {
  return getUser() !== null;
}
