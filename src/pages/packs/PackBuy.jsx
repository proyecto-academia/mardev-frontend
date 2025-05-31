import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaymentProvider from "../../components/checkout/PaymentProvider";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import { usePackStore } from "../../stores/usePackStore";

export default function PackBuy() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const itemType = "pack"; // Tipo de ítem ("course" o "pack")
  const token = localStorage.getItem("token"); // Token de autenticación
  const { singlePack, fetchPack } = usePackStore();

  useEffect(() => {
    const fetchPackIfNeeded = async () => {
      if (singlePack == null || singlePack.id !== parseInt(packId)) {
        await fetchPack(packId);
      }
    };
    fetchPackIfNeeded();
  }, [singlePack, fetchPack, packId]);

  useEffect(() => {
    if (singlePack?.is_free) {
      navigate("/packs", { replace: true }); // Redirige a /packs si el pack es gratuito
    }
  }, [singlePack, navigate]);

  if (!singlePack) {
    return <p>Loading pack details...</p>;
  }

  return (
    <section className="pack-buy">
      <article className="pack-buy-details">
        <header>
          <h1>{singlePack.name}</h1>
          <p>{singlePack.description}</p>
        </header>
        <img src={singlePack.photo} alt={singlePack.name} />
      </article>
      <div className="checkout-container">
        <h2>Checkout</h2>
        <PaymentProvider itemId={packId} itemType={itemType} token={token}>
          <CheckoutForm token={token} successUrl={`/profile/pack/${packId}`} />
          <ul>
            <li>
              <strong>Price:</strong>{" "}
              {singlePack.is_free ? "Free" : `$${singlePack.price}`}
            </li>
            <li>
              <strong>Published:</strong>{" "}
              {new Date(singlePack.created_at).toLocaleDateString()}
            </li>
          </ul>
        </PaymentProvider>
      </div>
    </section>
  );
}