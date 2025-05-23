import React from "react";
import { useEffect, useState } from "react";
import defaultCourseImg from "../../assets/default-course.svg"; // Importa la imagen predeterminada
import MediaRepository from "../../api/media/MediaRepository";
export default function CourseCard({ course }) {
    const [courseImage, setCourseImage] = useState(defaultCourseImg);

    useEffect(() => {
      const fetchCourseImage = async () => {
        try {
          let image = await MediaRepository.getUrlSingleObject('courses', course.id, 'photo');
          if (!image || image.url === null) {
            setCourseImage(defaultCourseImg); // Usa la imagen predeterminada si no hay imagen
          } else {
            setCourseImage(image.url);
          }
        } catch (error) {
          console.error("Error fetching course image:", error);
          setCourseImage(defaultCourseImg); // Usa la imagen predeterminada en caso de error
        }
      };
  
      fetchCourseImage();
    }, [course.id]);
  return (
    <div className="course-card">
      <img src={courseImage} alt={course.name} className="course-image" />
      <h3 className="course-title">{course.name}</h3>
      <p className="course-description">{course.description}</p>
      <p className="course-price">
        {course.is_free ? "Gratis" : `$${course.price}`}
      </p>
      <button className="btn btn-secondary">Ver Curso</button>
    </div>
  );
}
