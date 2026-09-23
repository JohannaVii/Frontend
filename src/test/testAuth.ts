import { login } from "../services/authServer.ts";

login({
  username: "test@outlook.com",
  password: "test123",
})
  .then((data) => {
    console.log("Inloggningssvaret:", data);
  })
  .catch((error) => {
    console.error("Inloggningen misslyckades:", error);
  });
