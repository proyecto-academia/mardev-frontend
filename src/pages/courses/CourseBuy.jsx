import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useAvailableContentStore } from "../../stores/useAvailableContentStore";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51RSlPED85p1Y11xFIO3NcOblwPv5Ir4wqlODkhdClqHPp0IvOjukVAYO7KNvtRd8B0D7JuAOiVEy7EgT0AGgsU1M00Ekqemcme");

function CheckoutForm({ clientSecret, token }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

export default function CourseBuy() {
  const [clientSecret, setClientSecret] = useState("");
  const {id} = useParams();
  const itemType = "course"; // Tipo de ítem ("course" o "pack")
  const token = localStorage.getItem("token"); // Token de autenticación

  useEffect(() => {
    // Llama al endpoint para crear el Payment Intent
    fetch("https://mardev.es/api/core/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Token de autenticación
      },
      body: JSON.stringify({ id, type: itemType }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.clientSecret) {
          setClientSecret(data.data.clientSecret);
        } else {
          alert("Error al obtener clientSecret");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error en la petición");
      });
  }, [id, itemType, token]);

  if (!clientSecret) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Course Purchase</h1>
      <p className="text-lg mb-6">To access this course, please purchase it. test card 4242424242424242 xx/xx xxx xxxxxx</p>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm clientSecret={clientSecret} itemId={id} itemType={itemType} token={token} />
      </Elements>
    </div>
  );
}