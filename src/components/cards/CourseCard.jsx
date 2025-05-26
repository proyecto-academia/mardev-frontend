import React from "react";
import defaultCourseImg from "../../assets/default-course.svg"; // Importa la imagen predeterminada
import { Link } from "react-router-dom";
import { useAvailableContentStore } from "../../stores/useAvailableContentStore";
export default function CourseCard({ course }) {
  // console.log("CourseCard", course);
  const {availableCoursesIds} = useAvailableContentStore();

  const additionalClasses = availableCoursesIds.includes(course.id) ? "available" : "unavailable";

  return (
    <div className={`course-card ${additionalClasses}`}>
      <img
        src={course.photo || defaultCourseImg}
        alt={course.name}
        className="course-image"
      />
      <h3 className="course-title">{course.name}</h3>
      <p className="course-description">
        {course.description} | {course.estimated_hours} hours
      </p>
      {!availableCoursesIds.includes(course.id) && (
        <p className="course-price">
          {course.is_free ? "Gratis" : `$${course.price}`}
        </p>
      )}
      <Link to={'/courses/' + course.id} className="course-link">
      <button className={`btn ${availableCoursesIds.includes(course.id) ? "btn-primary" : "btn-secondary"}`}>
        {availableCoursesIds.includes(course.id) ? "Ver Curso" : "Inscribirse"}
      </button>
      </Link>
    </div>
  );
}
