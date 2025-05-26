import React from "react";

export default function EnrollmentCard({ enrollment }) {
  const { enrollable, enrolled_at } = enrollment;

  return (
    <div>
      <h2>{enrollable.name}</h2>
      <p>{enrollable.description}</p>
      <p>Estimated Hours: {enrollable.estimated_hours}</p>
      <p>Price: {enrollable.is_free ? "Free" : `$${enrollable.price}`}</p>
      <p>Enrolled At: {new Date(enrolled_at).toLocaleDateString()}</p>
    </div>
  );
}