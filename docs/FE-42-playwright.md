# FE-42 - Undersök end-to-end-testning (Playwright)

## Playwright

Playwright är ett verktyg för E2E-testning av webbapplikationer. Det kan simulera hur en användare upplever och använder webbplatsen. Det kan till exempel öppna sidor, fylla i formulär och klicka på knappar.

Till vårt projekt kan vi använda Playwright för att testa ett helt flöde i frontend - gateway och våra mikrotjänster.

## Flödet

1. USER öppnar login-sidan
2. USER loggar in
3. Välkomstsidan visas
4. Användarens roll kontrolleras
5. USER går till produktsidan
6. Produkter hämtas och visas

Testet:
Playwright → Frontend → Gateway → Auth server / Product-service

## Testuppsättning

Playwright installerades i frontend, E2E-testet ligger i mappen `e2e`.
I testet används `getByLabel`, `getByRole` och `getByText` för att hitta fält, knappar och text på sidan.

## Resultat

Testet kördes lokalt i Chromium:
`npx playwright test e2e/webshop.spec.ts --project=chromium`

Första körningen misslyckades eftersom `getByText("Kund")` hittade både `Kund` och `Kundvagn (0)`.

Lösningen var att lägga till `exact: true`

Testet gick sedan igenom!
