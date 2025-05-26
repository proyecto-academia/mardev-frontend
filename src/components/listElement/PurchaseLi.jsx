import React from "react";

export default function PurchaseLi({ purchase }) {
  const { amount, payment_method, status, created_at, enrollment } = purchase;
  const { enrollable } = enrollment;

  const enrollableType = purchase.enrollment.enrollable_type.toLowerCase();
  const enrollableName = enrollableType.includes("course")
    ? "Course"
    : enrollableType.includes("pack")
    ? "Pack"
    : "Unknown";
  console.log("enrollable type " +  purchase.id, purchase.enrollment.enrollable_type);

  return (
    <li>
      <h3>{enrollableName}: {enrollable.name}</h3>
      <p>Description: {enrollable.description}</p>
      <p>Amount: ${amount}</p>
      <p>Payment Method: {payment_method}</p>
      <p>Status: {status}</p>
      <p>Purchase Date: {new Date(created_at).toLocaleDateString()}</p>
    </li>
  );
}