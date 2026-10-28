import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authServer";
import UserForm from "../components/CreateUserForm";

const RegisterUserPage = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (formData: {
    username: string;
    password: string;
  }) => {
    try {
      await registerUser(formData);

      setMessage("Användare skapad");
      setErrorMessage("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Användaren kunde inte skapas", error);
      setMessage("");

      //felmeddelande om användarnamnet finns registrerat
      if (error instanceof Error && error.message.includes("401")) {
        setErrorMessage("Användarnamnet finns redan");
      } else {
        setErrorMessage("Användaren kunde inte skapas");
      }

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfbf8] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/login"
          className="mb-8 inline-block text-base font-medium text-gray-700"
        >
          ← Tillbaka
        </Link>
        <h1 className="mb-8 text-4xl font-medium text-gray-800">
          Skapa ny användare
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

        <UserForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
};

export default RegisterUserPage;
