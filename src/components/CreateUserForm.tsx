import { useState } from "react";

type UserFormData = {
  username: string;
  password: string;
};

type UserFormProps = {
  onSubmit: (formData: UserFormData) => void | Promise<void>;
};

const UserForm = ({ onSubmit }: UserFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    //Felmeddelande om username fältet är tomt
    if (!username.trim()) {
      setError("Du behöver ange en e-postadress");
      return;
    }

    //Felmeddelande om lösenordfältet är tomt
    if (!password) {
      setError("Du behöver ange ett lösenord");
      return;
    }

    setError("");
    setLoading(true);

    const formData: UserFormData = {
      username: username.trim(),
      password,
    };

    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-5 rounded-xl border bg-white p-6 shadow-sm"
    >
      {/*Användarens användarnamn*/}
      <div>
        <label htmlFor="username" className="mb-1 block font-medium">
          Användarnamn
        </label>
        <input
          id="username"
          type="email"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          placeholder="Ange email"
          className="w-full rounded-md border border-stone-400 bg-[#f4f4f3] px-4 py-3 focus:outline-none focus:border-gray-800"
        />
      </div>

      {/*Användarens lösenord*/}
      <div>
        <label htmlFor="password" className="mb-1 block font-medium">
          Lösenord
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          placeholder="Ange lösenord"
          className="w-full rounded-md border border-stone-400 bg-[#f4f4f3] px-4 py-3 focus:outline-none focus:border-gray-800"
        />
      </div>

      {/* Visar felmeddelande om något är fel */}
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-pink-600 px-5 py-2 font-medium text-white hover:bg-pink-700 disabled:opacity-50"
      >
        {" "}
        {loading ? "Skapar konto..." : "Skapa konto"}
      </button>
    </form>
  );
};

export default UserForm;
