import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useClassStore } from '../../stores/useClassStore';
import { useCourseStore } from '../../stores/useCourseStore';
import VideoPlayer from '../../components/common/VideoPlayer'; 

export default function ClassDetail() {
  const { id: courseId, classId } = useParams(); 
  const { singleCourse, fetchCourse, loading: courseLoading } = useCourseStore();
  const { classes, fetchClasses, loading: classLoading } = useClassStore();
  const [singleClass, setSingleClass] = useState(null);

  useEffect(() => {
    if (singleCourse == null) {
      fetchCourse(courseId); // Carga el curso si no está en el estado
    }
    if (classes.length === 0) {
      fetchClasses({ course_id: courseId }); // Carga las clases del curso si no están en el estado
    }
  }, [singleCourse, fetchCourse, courseId, classes.length, fetchClasses]);

  useEffect(() => {
    // Una vez que las clases están cargadas, establece la clase seleccionada
    if (classes.length > 0) {
      const selectedClass = classes.find((c) => c.id === parseInt(classId));
      setSingleClass(selectedClass || null); // Si no se encuentra, establece null
    }
  }, [classes, classId]);

  if (courseLoading || classLoading) {
    return <p>Loading class details...</p>;
  }

  if (!singleClass) {
    return (
      <>
        <p>Class not found</p>
        <p><Link to="/">Home</Link></p>
      </>
    );
  }

  console.log("singleClass:", singleClass);

  return (
    <div className="class-detail">
      <h1>{singleClass.title}</h1>
      <VideoPlayer videoUrl={singleClass.video} title={singleClass.title} />

      <p>{singleClass.description}</p>
      <div dangerouslySetInnerHTML={{ __html: singleClass.content || "No content available." }}></div>

    </div>
  );
}