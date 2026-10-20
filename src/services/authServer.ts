import type {
  CurrentUserResponse,
  LoginRequest,
  LoginResponse,
  StoredUser,
} from "../types/auth";

// URL till Gateway från .env.local
const API_BASE = import.meta.env.VITE_GATEWAY_API_URL;

// nyckel för användarinformation, inte JWT-token
const USER_KEY = "user";

// loggar in via gatewayen och låter webbläsaren hantera cookien
export async function login(credentials: LoginRequest): Promise<StoredUser> {
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

    // gör om inloggningssvaret till appens gemensamma användartyp
    const user: StoredUser = {
      username: data.subject,
      subject: data.subject,
      roles: data.roles,
      expiresIn: data.expiresIn,
    };

    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  } catch (error) {
    // körs om Auth Server inte går att nå, inget svar alls
    if (error instanceof TypeError) {
      throw new Error(
        "Kan inte ansluta till servern. Kontrollera att servern är igång.",
      );
    }
    throw error;
  }
}

// kontrollerar om användaren fortfarande är inloggad via Gateway
export async function restoreUser(): Promise<StoredUser | null> {
  try {
    const response = await fetch(`${API_BASE}/gateway/auth/me`, {
      method: "GET",
      credentials: "include", // skickar med den HttpOnly-cookie som finns i webbläsaren
    });

    // ingen giltig inloggning finns
    if (!response.ok) {
      sessionStorage.removeItem(USER_KEY);
      return null;
    }

    // hämtar användarnamn och roller från Gateway
    const data: CurrentUserResponse = await response.json();

    // sparar användarinformation, aldrig JWT-token
    const user: StoredUser = {
      username: data.username,
      subject: data.username,
      roles: data.roles,
    };

    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  } catch {
    // om Gateway inte går att nå behandlas användaren som utloggad
    sessionStorage.removeItem(USER_KEY);
    return null;
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
export function getUser(): StoredUser | null {
  const userData = sessionStorage.getItem(USER_KEY);

  return userData ? (JSON.parse(userData) as StoredUser) : null;
}

// kontrollerar om användarinformation finns sparad
// giltigheten kontrolleras separat genom restoreUser() mot Gateway
export function isAuthenticated(): boolean {
  return getUser() !== null;
}
