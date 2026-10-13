import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, it, expect, vi } from "vitest";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
});

const product: Product = {
  id: 1,
  name: "Test-produkt 1",
  description: "En beskrivning till produkt-1",
  price: 100,
  stock: 10,
  category: "NECKLACES",
  imageUrl: "/images/necklaces/test.avif",
};

describe("ProductCard", () => {
  it("Visar produktinformationen korrekt", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test-produkt 1")).toBeInTheDocument();
    expect(
      screen.getByText("En beskrivning till produkt-1"),
    ).toBeInTheDocument();
    expect(screen.getByText("100 kr")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("Visar produktbild när imageUrl finns", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    );

    const image = screen.getByRole("img", {
      name: "Test-produkt 1",
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/necklaces/test.avif");
  });

  it("Visar ingen produktbild när imageUrl saknas", () => {
    const productWithoutImage = {
      ...product,
      imageUrl: "",
    };

    render(
      <MemoryRouter>
        <ProductCard product={productWithoutImage} />
      </MemoryRouter>,
    );

    expect(
      screen.queryByRole("img", { name: "Test-produkt 1" }),
    ).not.toBeInTheDocument();
  });

  it("Kör onAdd med rätt produkt", () => {
    const onAdd = vi.fn();
    render(
      <MemoryRouter>
        <ProductCard product={product} onAdd={onAdd} />
      </MemoryRouter>,
    );
    const button = screen.getByRole("button", { name: "Lägg i kundvagnen" });
    button.click();
    expect(onAdd).toHaveBeenCalledWith(product);
  });
});
