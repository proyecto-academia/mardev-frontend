import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaymentProvider from "../../components/checkout/PaymentProvider";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import { usePackStore } from "../../stores/usePackStore";
import { useEnrollmentStore } from "../../stores/useEnrollmentStore";
import { useAvailableContentStore } from "../../stores/useAvailableContentStore";

export default function PackBuy() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const itemType = "pack"; // Tipo de ítem ("course" o "pack")
  const token = localStorage.getItem("token"); // Token de autenticación
  //   const { singlePack, fetchPack } = usePackStore();
  const singlePack = usePackStore((state) => state.singlePack);
  const fetchPack = usePackStore((state) => state.fetchPack);

  console.log("[PackBuy] packId from useParams:", packId);
  console.log("[PackBuy] singlePack before fetch:", singlePack);

  useEffect(() => {
    const fetchPackIfNeeded = async () => {
      console.log("[PackBuy] Checking if pack needs to be fetched...");
      if (singlePack == null || singlePack.id !== parseInt(packId)) {
        console.log("[PackBuy] Fetching pack with ID:", packId);
        try {
          await fetchPack(packId);
          console.log("[PackBuy] Pack fetched successfully.", singlePack);
        } catch (error) {
          console.error("[PackBuy] Error fetching pack:", error);
        }
      } else {
        console.log("[PackBuy] Pack already loaded:", singlePack);
      }
    };
    fetchPackIfNeeded();
  }, [singlePack, fetchPack, packId]);

  useEffect(() => {
    const checkIfPackIsFree = async () => {
      console.log("[PackBuy] Checking if pack is free...");
      if (singlePack?.is_free) {
        try {
          console.log("[PackBuy] Pack is free, enrolling...");
          await useEnrollmentStore.getState().createPackEnrollment(packId);
          console.log("[PackBuy] Enrollment successful, redirecting...");
          const fetchAvailableCourses =
            useAvailableContentStore.getState().fetchAvailableCourses;
          await fetchAvailableCourses(); // Refresh available courses

          navigate("/packs", { replace: true });
        } catch (error) {
          console.error("[PackBuy] Error enrolling in free pack:", error);
        }
      }
    };

    checkIfPackIsFree();
  }, [singlePack, navigate, packId]);

  if (!singlePack) {
    console.log(
      "[PackBuy] singlePack is null or undefined, showing loading message..."
    );
    return <p>Loading pack details...</p>;
  }

  console.log("[PackBuy] Rendering pack details:", singlePack);

  return (
    <section className="pack-buy">
      <article className="pack-buy-details">
        <header>
          <h1>{singlePack.name}</h1>
          <p>{singlePack.description}</p>
        </header>
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
