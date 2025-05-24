import React from "react";
import defaultCourseImg from "../../assets/default-course.svg"; // Importa la imagen predeterminada
export default function CourseCard({ course }) {

  console.log("CourseCard", course);

  return (
    <div className="course-card">
      <img src={course.photo || defaultCourseImg} alt={course.name} className="course-image" />
      <h3 className="course-title">{course.name}</h3>
      <p className="course-description">{course.description}</p>
      <p className="course-price">
        {course.is_free ? "Gratis" : `$${course.price}`}
      </p>
      <button className="btn btn-secondary">Ver Curso</button>
    </div>
  );
}
