const ORDER_API = import.meta.env.VITE_ORDER_API_URL;

export async function testCors() {
  try {
    const response = await fetch(`${ORDER_API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [],
      }),
    });

    console.log("Status:", response.status);
    console.log("CORS fungerar - backend svarade.");
  } catch (error) {
    console.error("CORS eller nätverksfel:", error);
  }
}
