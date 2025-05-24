import React from "react";

export default function ClassLi({ classItem }) {
  return (
    <li className="class-item">
      <h3>{classItem.title}</h3>
      <p>{classItem.description}</p>
      <small>Position: {classItem.position}</small>
    </li>
  );
}