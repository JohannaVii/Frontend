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
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link
        to="/login"
        className="mb-8 inline-block text-lg font-semibold text-slate-800"
      >
        ← Tillbaka
      </Link>
      <h1 className="mb-8 text-3xl font-bold">Skapa ny användare</h1>
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
    </main>
  );
};

export default RegisterUserPage;
