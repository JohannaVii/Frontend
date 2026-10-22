import App from "../App";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, it, expect, vi } from "vitest";

afterEach(() => {
  cleanup();
  sessionStorage.clear();
  vi.resetAllMocks();
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
      <MemoryRouter initialEntries={["/gateway/auth/login"]}>
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

    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(null, { status: 401 }),
    );

    render(
      <MemoryRouter initialEntries={["/gateway/auth/login"]}>
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
