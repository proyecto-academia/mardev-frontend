import React from "react";
import { useParams } from "react-router-dom";
import PaymentProvider from "../../components/checkout/PaymentProvider";
import CheckoutForm from "../../components/checkout/CheckoutForm";

export default function CourseBuy() {
  const { id } = useParams();
  const itemType = "course"; // Tipo de ítem ("course" o "pack")
  const token = localStorage.getItem("token"); // Token de autenticación

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Course Purchase</h1>
      <p className="text-lg mb-6">To access this course, please purchase it. Test card: 4242424242424242 xx/xx xxx xxxxxx</p>
      <PaymentProvider itemId={id} itemType={itemType} token={token}>
        <CheckoutForm token={token} />
      </PaymentProvider>
    </div>
  );
}