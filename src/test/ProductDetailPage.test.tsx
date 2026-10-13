import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, it, expect, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProductDetailPage from "../pages/ProductDetailPage";
import { getProductById } from "../services/productService";

afterEach(() => {
  cleanup();
});

//Ersätter riktiga API anrropet med en mock
vi.mock("../services/productService", () => ({
  getProductById: vi.fn(),
}));

describe("ProductDetailPage", () => {
  it("Visar laddningsmeddelande medan produkten hämtas", () => {
    //new Promise skapar ett anrop som aldrig blir färdigt
    vi.mocked(getProductById).mockReturnValue(new Promise(() => {}));
    render(
      //ger komponenten en URL med produktens ID
      <MemoryRouter initialEntries={["/products/1"]}>
        <Routes>
          <Route
            path="/products/:id"
            element={
              <ProductDetailPage onAddToCart={vi.fn()}></ProductDetailPage>
            }
          ></Route>
        </Routes>
      </MemoryRouter>,
    );
    //Kontrollerar om laddningsmeddelandet faktiskt visas
    expect(screen.getByText("Laddar produkt...")).toBeInTheDocument();
  });

   it("Visar felmeddelande om produkten inte kan hämtas eller inte finns", async () => {
    vi.mocked(getProductById).mockResolvedValue(null as never);
    render(
      //ger komponenten en URL med produktens ID
      <MemoryRouter initialEntries={["/products/1"]}>
        <Routes>
          <Route
            path="/products/:id"
            element={
              <ProductDetailPage onAddToCart={vi.fn()}></ProductDetailPage>
            }
          ></Route>
        </Routes>
      </MemoryRouter>,
    );
    //Kontrollerar om felmeddelande visas
    expect(
      await screen.findByText("Produkten du söker kunde inte hämtas eller finns inte"),
    ).toBeInTheDocument();
  });

  it("Visar felmeddelande om API fel inträffar", async () => {
    vi.mocked(getProductById).mockRejectedValue(
      new Error("Produkten kunde inte hämtas"),
    );
    render(
      //ger komponenten en URL med produktens ID
      <MemoryRouter initialEntries={["/products/1"]}>
        <Routes>
          <Route
            path="/products/:id"
            element={
              <ProductDetailPage onAddToCart={vi.fn()}></ProductDetailPage>
            }
          ></Route>
        </Routes>
      </MemoryRouter>,
    );
    //Kontrollerar om felmeddelande visas
    expect(
      await screen.findByText("Kunde inte hämta produkten"),
    ).toBeInTheDocument();
  });
});
