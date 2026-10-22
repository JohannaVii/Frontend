import App from "../App";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";

afterEach(() => {
  cleanup();
  sessionStorage.clear();
  vi.restoreAllMocks();
});

vi.mock("../components/Header", () => ({
  default: ({ loggIn }: { loggIn: boolean }) => (
    <div data-testid="header-status">{loggIn ? "inloggad" : "utloggad"}</div>
  ),
}));

//test för 200
describe("App, återställning av användare", () => {
  it("återställer användaren vid lyckat svar", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          username: "test@gmail.com",
          roles: ["ROLE_USER"],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("header-status")).toHaveTextContent("inloggad");
    });

    //Kontrollerar att App anropar auth-endpointen
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/gateway/auth/me"),
      expect.objectContaining({
        method: "GET",
        credentials: "include",
      }),
    );

    expect(JSON.parse(sessionStorage.getItem("user")!)).toEqual({
      username: "test@gmail.com",
      subject: "test@gmail.com",
      roles: ["ROLE_USER"],
    });
  });

  //test för 401
  it("betraktar användaren som utloggad vid status 401", async () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        username: "gammaltest@gmail.com",
        subject: "gammaltest@gmail.com",
        roles: ["ROLE_USER"],
      }),
    );

    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 401 }));

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App></App>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("header-status")).toHaveTextContent("utloggad");
    });

    // Kontrollerar att App faktiskt anropa auth-endpointen
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/gateway/auth/me"),
      expect.objectContaining({
        method: "GET",
        credentials: "include",
      }),
    );

    expect(sessionStorage.getItem("user")).toBeNull();
  });
});


describe("Testa produkthämtning", () => {
  beforeEach(() => {
    sessionStorage.clear();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        username: "paveena.nsw@gmail.com",
        subject: "paveena.nsw@gmail.com",
        roles: ["ROLE_USER"],
      }),
    );
  });

  it("Visar produkter för en inloggad användare", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: "Produkter" }),
    ).toBeInTheDocument();

    expect(await screen.findByText("Bracelet")).toBeInTheDocument();

    expect(screen.getAllByText("Örhängen").length).toBeGreaterThan(0);
  });

  it("Visar ett felmeddelande vid misslyckad produkthämtning", async () => {
    server.use(
      http.get("*/gateway/products", () => {
        return HttpResponse.json(
          { message: "Serverfel" },
          { status: 500 },
        );
      }),
    );

    render(
      <MemoryRouter initialEntries={["/products"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByText("ERROR: Produkter kunde inte hämtas."),
    ).toBeInTheDocument();
  });
});
