// vilka kategorier som är tillåtna
export type Category = "BRACELETS" | "NECKLACES" | "EARRINGS" | "RINGS";

// en lista över tillåtna kategorier
export const categories: Category[] = [
  "BRACELETS",
  "NECKLACES",
  "EARRINGS",
  "RINGS",
];

// namn som visas för användaren
export const categoryNames: Record<Category, string> = {
  BRACELETS: "Armband",
  NECKLACES: "Halsband",
  EARRINGS: "Örhängen",
  RINGS: "Ringar",
};
