import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAvailableContentStore } from "../../stores/useAvailableContentStore";
import { useNotificationStore } from "../../stores/useNotificationStore";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ clientSecret, token, successUrl = '/profile' }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchAvailableCourses = useAvailableContentStore((state) => state.fetchAvailableCourses);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    const card = elements.getElement(CardNumberElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (error) {
      useNotificationStore.getState().addNotification({
        type: "error",
        message: `Error al procesar el pago: ${error.message}`,
      });
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
        .then(async (data) => {
          if (data.success) {
            try {
              await fetchAvailableCourses(); // Espera a que termine fetchAvailableCourses
              navigate(successUrl, { replace: true }); // Redirige al usuario
            } catch (err) {
              console.error("Error al cargar los cursos disponibles:", err);
              alert("Error al cargar los cursos disponibles.");
            }
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
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Payment Details</legend>
        <div>
          <label htmlFor="card-number">Card Number</label>
          <CardNumberElement id="card-number" />
        </div>
        <div>
          <label htmlFor="card-expiry">Expiry Date</label>
          <CardExpiryElement id="card-expiry" />
        </div>
        <div>
          <label htmlFor="card-cvc">CVC</label>
          <CardCvcElement id="card-cvc" />
        </div>
        <button type="submit" disabled={!stripe || !clientSecret || loading}>
          {loading ? "Processing..." : "Pay"}
        </button>
      </fieldset>
    </form>
  );
}