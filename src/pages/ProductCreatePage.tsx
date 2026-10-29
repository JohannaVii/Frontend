import ProductForm from "../components/ProductForm";
import type { Category } from "../types/category";
import { createProduct } from "../services/productService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCreatePage = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    try {
      // skickar produktinformationen till Product Service
      await createProduct(formData);

      //Sätter meddelande till "Produkt skapad"
      setErrorMessage("");
      setMessage("Produkt skapad");
      //Skickar admin tillbaka till adminPage om produkt skapats efter 2 sekunder
      setTimeout(() => {
        navigate("/adminPage");
      }, 2000);
    } catch (error) {
      //API fel fångas upp om produkten inte kunde skapas
      console.error("Kunde inte skapa produkten: ", error);
      setMessage("");
      setErrorMessage("Kunde inte skapa produkten");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfbf8] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/adminPage"
          className="mb-8 inline-block text-base font-medium text-gray-700"
        >
          ← Tillbaka
        </Link>
        <h1 className="mb-8 text-4xl font-medium text-gray-800">
          Skapa produkt
        </h1>
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

        <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </main>
  );
};
export default ProductCreatePage;
