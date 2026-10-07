import ProductForm from "../components/ProductForm";
import type { Category } from "../types/category";
import { createProduct } from "../services/productService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCreatePage = () => {

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // tar emot data från ProductForm
  const handleSubmit = async (formData: {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: Category;
    imageUrl: string;
  }) => {
    try {
      //Skickar produktinformatione till Product Service
      await createProduct(formData);

      //Sätter meddelande till "Produkt skapad"
      setMessage("Produkt skapad");
      //Skickar admin tillbaka till adminPage om produkt skapats efter 2 sekunder
      setTimeout(() => {
        navigate("/adminPage");
      }, 2000);

    } catch (error) {
      //API fel fångas upp om produkten inte kunde skapas
      console.error("Kunde inte skapa produkten: ", error);
      setMessage("")
      setErrorMessage("Kunde inte skapa produkten")
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Skapa produkt</h1>
      {message && (
        <p className="mb-4 rounded bg-green-100 p-3 text-green-800">
          {message}
        </p>
      )}

      {errorMessage && (
        <p className="mb-4 rounded bg-red-100 p-3 text-red-800">
          {errorMessage}
        </p>
      )}

      <ProductForm onSubmit={handleSubmit} />
    </main>
  );
};
export default ProductCreatePage;