# Frontend

## Om tjänsten
Frontend är den del av webbshoppen som användaren ser och använder. Här kan man se produkter, registrera sig, logga in, lägga produkter i kundvagnen och skapa en order.

Som ADMIN kan man hantera produkter.

## Teknik

- React
- React Router
- TypeScript
- Vite
- Vitest
- React Testing Library
- Playwright

## Köra lokalt

### Krav
**För att köra Frontend lokalt behövs:**
- Node.js
- npm

### Miljövariabler

| Variabel               | Beskrivning              |
|------------------------|--------------------------|
| `VITE_AUTH_API_URL`    | URL till Auth Server     |
| `VITE_PRODUCT_API_URL` | URL till Product-Service |
| `VITE_ORDER_API_URL`   | URL till Order-Service   |
| `VITE_GATEWAY_API_URL` | URL till Gateway         |

### Starta tjänsten
**Installera dependencies:**
`npm install`

**Starta Frontend:**
`npm run dev`

Frontend körs lokalt på port 5173.

## API / Endpoints

Frontend har inga egna endpoints!

Anrop till backend går via Gateway.

## Övrigt

Inloggning och behörighet hanteras med Auth Server.

Tester körs med Vitest och React Testing Library.
E2E-test av USER-flödet med Playwright.

Kundvagnen sparas lokalt i webbläsaren.

## Driftsatt miljö (Render)
### Inväntar driftsättning