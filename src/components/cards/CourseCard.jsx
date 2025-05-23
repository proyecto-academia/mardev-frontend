import React from 'react';
import defaultCourseImg from '../../assets/default-course.svg'; // Importa la imagen predeterminada

export default function CourseCard({ course }) {
  const courseImage = course.photo.url === null ? defaultCourseImg: course.photo.url; // Usa la imagen del curso o la predeterminada

  return (
    <div className="course-card">
      <img src={courseImage} alt={course.name} className="course-image" />
      <h3 className="course-title">{course.name}</h3>
      <p className="course-description">{course.description}</p>
      <p className="course-price">
        {course.is_free ? 'Gratis' : `$${course.price}`}
      </p>
      <button className="btn btn-secondary">Ver Curso</button>
    </div>
  );
}