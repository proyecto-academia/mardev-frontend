import React from "react";

export default function ClassLi({ classItem, selectedClass, onClick }) {
  return (
    <li className={`class-li ${ selectedClass?.id === classItem.id ? "selected" : "" }`} onClick={onClick} >
      <div className="position">
        <p>Position: {classItem.position}</p>
      </div>
      <div className="class-title">
        <h3>{classItem.title}</h3>
      </div>
    </li>
  );
}
