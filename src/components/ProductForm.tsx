import React, { useState } from "react";
import { categories, type Category } from "../types/category";

// data som formuläret skickar vidare när användaren klickar på Skapa produkt
type ProductFormData = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  imageUrl: string;
};

// ProductForm tar emot en onSubmit-funktion från sidan som använder formuläret
type ProductFormProps = {
  onSubmit: (formData: ProductFormData) => void;
};

const ProductForm = ({ onSubmit }: ProductFormProps) => {
  // state håller reda på vad användaren har skrivit i formuläret
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  // state sparar den kategori som användaren har valt
  // BRACELETS är vald från början
  const [category, setCategory] = useState<Category>("BRACELETS");
  // state sparar bildadressen som användaren skriver in
  const [imageUrl, setImageUrl] = useState("");

  // state används för att visa felmeddelanden
  const [error, setError] = useState("");

  // körs när användaren skickar formuläret
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // kontrollera att priset är större än 0
    if (Number(price) <= 0) {
      setError("Priset måste vara större än noll!");
      return;
    }

    // kontrollera att lagersaldot inte är negativt
    if (Number(stock) < 0) {
      setError("Lagersaldo kan inte vara negativt!");
      return;
    }

    // ta bort tidigare fel om formuläret är korrekt
    setError("");

    // samlar formulärets värden i ett objekt
    // price och stock omvandlas från text till number
    const formData: ProductFormData = {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
      imageUrl,
    };

    // skickar formulärets data vidare till sidan
    onSubmit(formData);
  };

  return (
    // använder handleSubmit när användaren klickar på Skapa produkt
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-5 rounded-xl border bg-white p-6 shadow-sm"
    >
      {/* Produktens namn */}
      <div>
        <label htmlFor="name" className="mb-1 block font-medium">
          Namn
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          placeholder="Ange produktnamn"
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      {/* Produktens beskrivning */}
      <div>
        <label htmlFor="description" className="mb-1 block font-medium">
          Beskrivning
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Ange produktbeskrivning"
          required
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      {/* Produktens pris */}
      <div>
        <label htmlFor="price" className="mb-1 block font-medium">
          Pris
        </label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="Ange pris"
          required
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      {/* Antal produkter som finns i lager */}
      <div>
        <label htmlFor="stock" className="mb-1 block font-medium">
          Lagersaldo
        </label>
        <input
          id="stock"
          type="number"
          value={stock}
          onChange={(event) => setStock(event.target.value)}
          placeholder="Ange antal i lager"
          required
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      {/* Produktens kategori */}
      <div>
        <label htmlFor="category" className="mb-1 block font-medium">
          Kategori
        </label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value as Category)}
          required
          className="w-full rounded-md border px-3 py-2"
        >
          {/* Skapar ett alternativ i listan för varje kategori */}
          {categories.map((categoryOption) => (
            <option key={categoryOption} value={categoryOption}>
              {categoryOption}
            </option>
          ))}
        </select>
      </div>

      {/* Produktens bildadress */}
      <div>
        <label htmlFor="imageUrl" className="mb-1 block font-medium">
          Bild-URL
        </label>
        <input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          placeholder="Ange URL till produktbild"
          required
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      {/* Visar felmeddelande om något är fel */}
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {/* Knapp som skickar formuläret */}
      <button
        type="submit"
        className="rounded-md bg-pink-500 px-5 py-2 font-medium text-white hover:bg-pink-600"
      >
        Skapa produkt
      </button>
    </form>
  );
};

export default ProductForm;
