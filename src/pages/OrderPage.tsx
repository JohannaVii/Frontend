import { useEffect, useState } from "react";
import { getCustomerOrders } from "../services/orderService";
import type { OrderResponse } from "../types/order";

// visar kundens orderhistorik
const OrderPage = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // hämtar kundens ordrar när sidan öppnas
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const customerOrders = await getCustomerOrders();
        setOrders(customerOrders);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Ett fel uppstod när ordrarna skulle hämtas!",
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchOrders();
  }, []);

  // gör betalningsstatusen mer lättläst på svenska
  const getPaymentStatus = (status: OrderResponse["paymentStatus"]) => {
    switch (status) {
      case "PAID":
        return {
          text: "Betald",
          styles: "bg-green-100 text-green-800",
        };
      case "PENDING":
        return {
          text: "Inväntar betalning",
          styles: "bg-yellow-100 text-yellow-800",
        };
      case "EXPIRED":
        return {
          text: "Utgången",
          styles: "bg-gray-100 text-gray-700",
        };
      default:
        return {
          text: "Okänd status",
          styles: "bg-gray-100 text-gray-700",
        };
    }
  };

  // formaterar belopp i svenska kronor
  const formatPrice = (price: number) =>
    price.toLocaleString("sv-SE", {
      style: "currency",
      currency: "SEK",
    });

  // visar datum och tid i svenskt format
  const formatDate = (date: string) =>
    new Date(date).toLocaleString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // visar ett meddelande medan ordrarna hämtas
  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Mina ordrar</h1>
        <p className="text-gray-600">Hämtar dina ordrar...</p>
      </main>
    );
  }

  // visar ett tydligt felmeddelande om hämtningen misslyckas
  if (error) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Mina ordrar</h1>
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
        >
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* sidans rubrik och kort introduktion */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
          Mina ordrar
        </h1>
        <p className="mt-2 text-gray-600">
          Här hittar du dina tidigare köp och betalningsstatus
        </p>
      </div>

      {/* visas om kunden ännu inte har några ordrar */}
      {orders.length === 0 ? (
        <section className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">
            Du har inga ordrar ännu
          </h2>
          <p className="mt-2 text-gray-600">
            Dina köp kommer att visas här när du har lagt en order
          </p>
        </section>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const paymentStatus = getPaymentStatus(order.paymentStatus);

            return (
              <section
                key={order.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                {/* ordernummer, datum och betalningsstatus */}
                <div className="flex flex-col gap-4 border-b border-gray-200 bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Order #{order.id}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      {formatDate(order.orderDate)}
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-semibold ${paymentStatus.styles}`}
                  >
                    {paymentStatus.text}
                  </span>
                </div>

                {/* produktlista med antal och styckpris */}
                <div className="p-5">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Produkter
                  </h3>

                  <ul className="divide-y divide-gray-100">
                    {order.items.map((item, index) => (
                      <li
                        key={`${item.id}-${index}`}
                        className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.quantity} st × {formatPrice(item.price)}
                          </p>
                        </div>

                        <p className="font-medium text-gray-700">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* visar orderns totalsumma längst ned */}
                  <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                    <span className="font-semibold text-gray-700">Totalt</span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatPrice(order.totalPrice)}
                    </span>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default OrderPage;
