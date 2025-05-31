import React from "react";

export default function PackCard({ pack }) {
  return (
    <div className={`pack-card ${pack.is_free ? "pack-free" : ""}`}>
      <h3 className="pack-title">{pack.name}</h3>
      <p className="pack-description">{pack.description}</p>
      <p className="pack-price">{`$${pack.price}`}</p>
      <button className="btn btn-primary">
        {pack.is_free ? "Try now" : "Buy"}
      </button>
    </div>
  );
}