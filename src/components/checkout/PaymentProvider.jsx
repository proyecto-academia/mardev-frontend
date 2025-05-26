import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RSlPED85p1Y11xFIO3NcOblwPv5Ir4wqlODkhdClqHPp0IvOjukVAYO7KNvtRd8B0D7JuAOiVEy7EgT0AGgsU1M00Ekqemcme");

export default function PaymentProvider({ itemId, itemType, token, children }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Llama al endpoint para crear el Payment Intent
    fetch("https://mardev.es/api/core/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Token de autenticación
      },
      body: JSON.stringify({ id: itemId, type: itemType }),
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
  }, [itemId, itemType, token]);

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