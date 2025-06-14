import React, { useEffect } from "react";
import { usePackStore } from "../../stores/usePackStore";
import { Link } from "react-router-dom";

export default function PackCard({ pack }) {
  const enrolledPacks = usePackStore((state) => state.enrolledPacks);
  const fetchUserEnrolledPacks = usePackStore(
    (state) => state.fetchUserEnrolledPacks
  );
  useEffect(() => {
    // Cargar los packs inscritos al montar el componente
    fetchUserEnrolledPacks();
  }, [fetchUserEnrolledPacks]);

  // Verificar si el usuario está inscrito en el pack
  const isEnrolled = enrolledPacks.some(
    (enrolledPack) => enrolledPack.id === pack.id
  );

  return (
    <div
      className={`pack-card ${isEnrolled ? "pack-enrolled" : ""} ${
        pack.is_free ? "pack-free" : ""
      }`}
    >
      <h3 className="pack-title">{pack.name}</h3>
      <p className="pack-description">{pack.description}</p>
      <p className="pack-price">{`$${pack.price}`}</p>
      {isEnrolled ? (
        <p className="enrolled-text">Already enrolled</p>
      ) : (
        <Link to={`/packs/buy/${pack.id}`} className="btn btn-primary">
          
            {pack.is_free ? "Try now" : "Buy"}
        </Link>
      )}
    </div>
  );
}
