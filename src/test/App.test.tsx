import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import App from "../App";

describe("Testa produkthämtning", () => {
  beforeEach(() => {
    //Rensar all information som finns i sessionStorage
    sessionStorage.clear();

    //Spara testinformation om en användare
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        expiresIn: 3600,
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

expect(await screen.findByRole("heading", { name: "Produkter" })).toBeInTheDocument();

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
