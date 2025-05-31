import React, { useState, useEffect } from "react";
import { useFetchPacks } from "../../hooks/useFetchPacks";
import PackCard from "../../components/cards/PackCard";
import { useCourseStore } from "../../stores/useCourseStore";

export default function PackListIncludedCourses() {
  const packs = useFetchPacks();
  const fetchCoursesByPack = useCourseStore((state) => state.fetchCoursesByPack);
  const courses = useCourseStore((state) => state.courses);

  // Inicializar el estado con el primer pack (si existe)
  const [hoveredPackId, setHoveredPackId] = useState(packs?.[0]?.id || null);

  useEffect(() => {
    if (hoveredPackId) {
      fetchCoursesByPack(hoveredPackId); // Cargar los cursos del pack seleccionado
    }
  }, [hoveredPackId, fetchCoursesByPack]);

  const handleMouseEnter = (packId) => {
    setHoveredPackId(packId); // Actualizar el estado del pack seleccionado
  };

  // Eliminar `handleMouseLeave` para mantener el pack seleccionado
  // Si deseas mantenerlo, puedes usarlo para otras funcionalidades

  if (!packs || packs.length === 0) {
    return <p>No packs available.</p>;
  }

  return (
    <>
      <section className="packs-list">
        <header>
          <h1>Available Packs</h1>
          <p>Explore our curated packs to enhance your learning experience.</p>
        </header>
        <div className="packs-container">
          {packs.map((pack) => (
            <div
              className={`pack-card-wrapper ${hoveredPackId === pack.id ? "selected" : ""}`}
              key={pack.id}
              onMouseEnter={() => handleMouseEnter(pack.id)}
            >
              <PackCard pack={pack} />
            </div>
          ))}
        </div>
      </section>
      {hoveredPackId && (
        <section>
          <header>
            <h2>Courses in Pack</h2>
            <p>Courses included in the selected pack:</p>
          </header>
          <div className="courses-container">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <img src={course.photo} alt={course.name} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
