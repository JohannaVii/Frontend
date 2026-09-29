const WelcomePage = () => {
  //Hämtar användare
  const userData = sessionStorage.getItem("user");

  //Skriver ut om ingen anvvändare är inloggad eller om sidan inte kan hämta användare
  if (!userData) {
    return <p>Ingen användare är inloggad</p>;
  }

  const user = JSON.parse(userData);

  //En typ av if/else som ändrar roll till Admin eller Kund beroende på roll
  const roleName = user.roles.includes("ROLE_ADMIN")
    ? "Admin"
    : user.roles.includes("ROLE_USER")
      ? "Kund"
      : "Okänd roll";

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <section className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg text-center">
        <h1 className="mb-6 text-4xl font-bold text-slate-800">
          Välkommen till KJPJ webbshoppen!
        </h1>

        <div className="rounded-xl bg-slate-50 p-6">
          <p className="mb-2 text-lg text-slate-700">
            <span className="font-semibold">Inloggad som:</span> {user.subject}
          </p>

          <p className="text-lg text-slate-700">
            <span className="font-semibold">Roll:</span>{" "}
            <span className="rounded-md bg-teal-100 px-3 py-1 text-teal-700 font-medium">
              {roleName}
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default WelcomePage;
