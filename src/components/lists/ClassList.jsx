import React, { useEffect } from "react";
import ClassLi from "../listElement/ClassLi";
import { useClassStore } from "../../stores/useClassStore";
import { useParams } from "react-router-dom";

export default function ClassList() {
  const { id: courseId } = useParams(); // Obtén el courseId desde la URL
  const { classes, fetchClasses, loading } = useClassStore();

  useEffect(() => {
    if (courseId) {
      fetchClasses({ course_id: courseId }); // Filtra las clases por courseId
    }
  }, [courseId, fetchClasses]);

  if (loading) {
    return <p>Loading classes...</p>;
  }

  return (
    <ul className="class-list">
      {classes.map((classItem) => (
        <ClassLi key={classItem.id} classItem={classItem} />
      ))}
    </ul>
  );
}