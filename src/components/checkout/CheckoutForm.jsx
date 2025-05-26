import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useAvailableContentStore } from "../../stores/useAvailableContentStore";

export default function CheckoutForm({ clientSecret, token }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  console.log("clientSecret", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Procesando pago...");
    console.log((!stripe || !elements || !clientSecret) )
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    const card = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Confirmar la compra en el backend
      fetch("https://mardev.es/api/core/confirm-purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ payment_intent_id: paymentIntent.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Pago y compra confirmados con éxito!");
            const availableContentStore = useAvailableContentStore.getState();
            availableContentStore.fetchAvailableCourses();
          } else {
            alert("Error al confirmar la compra.");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          alert("Error en la confirmación");
          setLoading(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <CardElement className="border p-2 mb-4 w-full max-w-md" />
      <button
        type="submit"
        disabled={!stripe || !clientSecret || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Procesando..." : "Pagar"}
      </button>
    </form>
  );
}