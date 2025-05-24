import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ClassList from "../../components/lists/ClassList";
import { useCourseStore } from "../../stores/useCourseStore";

export default function CourseDetail() {
  const { id: courseId } = useParams(); // Obtén el courseId desde la URL
  const { singleCourse, fetchCourse, loading } = useCourseStore();
  useEffect(() => {
    if (singleCourse == null) {
        fetchCourse(courseId); // Carga los cursos si no están en el estado
    }
  }, [singleCourse, fetchCourse, courseId]);
  
  if (loading) {
    return <p>Loading course details...</p>;
  }

  if (!singleCourse) {
    return <p>Course not found.</p>;
  }

  return (
    <div className="course-detail">
      <h1>{singleCourse.name}</h1>
      <ClassList />
    </div>
  );
}
