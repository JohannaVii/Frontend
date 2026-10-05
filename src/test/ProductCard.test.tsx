import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";

const product: Product = {
  id: 1,
  name: "Test-produkt 1",
  description: "En beskrivning till produkt-1",
  price: 100,
  stock: 10,
};

describe("ProductCard", () => {
  it("Visar produktinformationen korrekt", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("Test-produkt 1")).toBeInTheDocument();
    expect(
      screen.getByText("En beskrivning till produkt-1"),
    ).toBeInTheDocument();
    expect(screen.getByText("100 kr")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("Kör onAdd med rätt produkt", () => {
    const onAdd = vi.fn();
    render(<ProductCard product={product} onAdd={onAdd} />);
    const button = screen.getByRole("button", { name: "Lägg i kundvagnen" });
    button.click();
    expect(onAdd).toHaveBeenCalledWith(product);
  });
});
