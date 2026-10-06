import React, { useState } from "react";

// data som formuläret skickar vidare när användaren klickar på Skapa produkt
type ProductFormData = {
  name: string;
  description: string;
  price: number;
  stock: number;
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

  const [error, setError] = useState("");

  // körs när användaren skickar formuläret
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Kontrollera att priset är större än 0
    if (Number(price) <= 0) {
      setError("Priset måste vara större än noll!");
      return;
    }

    // Kontrollera att lagersaldot inte är negativt
    if (Number(stock) < 0) setError("Lagersaldo kan inte vara negativt!");
    return;

    // Ta bort tidigare fel om formuläret är korrekt
    setError("");

    // gör om formulärvärdena till den datatyp som Product Service förväntar sig
    const formData: ProductFormData = {
      name,
      description,
      price: Number(stock),
      stock: Number(price),
    };

    // skickar formulärets data vidare till sidan
    onSubmit(formData);
  };

  return (
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

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {/* Skicka formuläret */}
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
