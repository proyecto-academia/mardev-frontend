import React, { useEffect, useState } from "react";
import ClassLi from "../listElement/ClassLi";
import { useClassStore } from "../../stores/useClassStore";
import { useParams } from "react-router-dom";
import ClassCard from "../cards/ClassCard";

export default function ClassList() {
  const { id: courseId } = useParams(); // Obtén el courseId desde la URL
  const { classes, fetchClasses, loading } = useClassStore();
  const [selectedClass, setSelectedClass] = useState(null); // Estado para la clase seleccionada

  useEffect(() => {
    if (courseId) {
      fetchClasses({ course_id: courseId }); // Filtra las clases por courseId
    }
  }, [courseId, fetchClasses]);

  useEffect(() => {
    if (classes.length > 0 && !selectedClass) {
      setSelectedClass(classes[0]);
    }
  }, [classes, selectedClass]);


  if (loading) {
    return <p>Loading classes...</p>;
  }

  const handleClassClick = (classItem) => {
    setSelectedClass(classItem); // Actualiza la clase seleccionada
  };


  return (
    <div className="class-list-container">
      <ul className="class-list">
        {classes.map((classItem) => (
          <ClassLi
            key={classItem.id}
            classItem={classItem}
            selectedClass={selectedClass} // Pasa el estado actual de la clase seleccionada
            onClick={() => handleClassClick(classItem)} // Pasa el manejador de clic
          />
        ))}
      </ul>
      {selectedClass && ( // Renderiza el ClassCard si hay una clase seleccionada
        <ClassCard classItem={selectedClass} />
      )}
    </div>
  );
}