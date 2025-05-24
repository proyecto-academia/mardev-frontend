import React from "react";
import defaultCourseImg from "../../assets/default-course.svg"; // Importa la imagen predeterminada
import { Link } from "react-router-dom";
export default function CourseCard({ course }) {
  // console.log("CourseCard", course);

  return (
    <div className="course-card">
      <img
        src={course.photo || defaultCourseImg}
        alt={course.name}
        className="course-image"
      />
      <h3 className="course-title">{course.name}</h3>
      <p className="course-description">
        {course.description} | {course.estimated_hours} hours
      </p>
      <p className="course-price">
        {course.is_free ? "Gratis" : `$${course.price}`}
      </p>
      <Link to={'/courses/' + course.id} className="course-link">
        <button className="btn btn-secondary">Ver Curso</button>
      </Link>
    </div>
  );
}
