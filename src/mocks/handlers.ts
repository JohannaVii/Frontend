import { http, HttpResponse } from "msw";

export const handlers = [
  // Mockad inloggning
  //MSW fånga post anrop och och kör funktionen
  http.post("*/gateway/auth/login", async ({ request }) => {
    const body = (await request.json()) as {
      username: string;
      password: string;
    };

    if (
      body.username === "paveena.nsw@gmail.com" &&
      body.password === "password"
    ) {
      return HttpResponse.json({
        expiresIn: 3600,
        subject: "paveena.nsw@gmail.com",
        roles: ["ROLE_USER"],
      });
    }

    return HttpResponse.json(
      { message: "Fel e-postadress eller lösenord." },
      { status: 401 },
    );
  }),

  // Mockad användare
  // Simulera ett API som returnera inloggade användare
  http.get("*/auth/me", () => {
    return HttpResponse.json({
      expiresIn: 3600,
      subject: "paveena.nsw@gmail.com",
      roles: ["ROLE_USER"],
    });
  }),

  // Mockad produkter
  http.get("*/gateway/products", () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "Brecelet",
        description: "Guld pläterad armband",
        price: 199,
        stock: 10,
        category: "BRACELETS",
        imageUrl: "/images/bracelets/bracelet-1.avif",
      },
      {
        id: 2,
        name: "Örhängen",
        description: "Guld pläterad örhängen",
        price: 149,
        stock: 8,
        category: "EARRINGS",
        imageUrl: "/images/earrings/earrings-1.avif",
      },
      {
        id: 3,
        name: "Halsband",
        description: "Elegant guld pläterad halsband",
        price: 249,
        stock: 6,
        category: "NECKLACES",
        imageUrl: "/images/necklaces/necklace-1.avif",
      },
      {
        id: 4,
        name: "Ring",
        description: "Guld pläterad ring",
        price: 299,
        stock: 12,
        category: "RINGS",
        imageUrl: "/images/rings/ring-1.avif",
      },
    ]);
  }),
];
