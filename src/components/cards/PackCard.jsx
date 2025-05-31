import React, { useEffect } from "react";
import { usePackStore } from "../../stores/usePackStore";

export default function PackCard({ pack }) {
  const enrolledPacks = usePackStore((state) => state.enrolledPacks);
  useEffect(() => {
    
    usePackStore.getState().fetchEnrolledPacks();
  }, []);

  // Verificar si el usuario está inscrito en el pack
  const isEnrolled = enrolledPacks.some((enrolledPack) => enrolledPack.id === pack.id);

  return (
    <div className={`pack-card ${isEnrolled ? "pack-enrolled" : ""} ${pack.is_free ? "pack-free" : ""}`}>
      <h3 className="pack-title">{pack.name}</h3>
      <p className="pack-description">{pack.description}</p>
      <p className="pack-price">{`$${pack.price}`}</p>
      <button className={`btn ${isEnrolled ? "btn-secondary" : "btn-primary"}`}>
        {isEnrolled ? "Enrolled" : pack.is_free ? "Try now" : "Buy"}
      </button>
    </div>
  );
}