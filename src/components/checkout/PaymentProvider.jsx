import React, {  useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentRepository from "../../api/core/PaymentRepository";
import { useNotificationStore } from "../../stores/useNotificationStore";

const stripePromise = loadStripe("pk_test_51RSlPED85p1Y11xFIO3NcOblwPv5Ir4wqlODkhdClqHPp0IvOjukVAYO7KNvtRd8B0D7JuAOiVEy7EgT0AGgsU1M00Ekqemcme");

export default function PaymentProvider({ itemId, itemType, children }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Llama al repositorio para crear el Payment Intent
    PaymentRepository.createPaymentIntent(itemId, itemType)
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          useNotificationStore.getState().addNotification({
            type: "error",
            message: "Error al crear el Payment Intent. Por favor, inténtalo de nuevo más tarde.",
          });
        }
      })
      .catch((error) => {
        console.error("Error en la petición:", error);
        useNotificationStore.getState().addNotification({
          type: "error",
          message: "Error al crear el Payment Intent. Por favor, inténtalo de nuevo más tarde.",
        });
      });
  }, [itemId, itemType]);

  if (!clientSecret) {
    return <p>Cargando...</p>;
  }

  // Pasar clientSecret como prop al hijo
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, { clientSecret })
  );

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {childrenWithProps}
    </Elements>
  );
}