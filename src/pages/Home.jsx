import { useState } from 'react';

// Datos dummy para slider y packs
const slides = [
  {
    id: 1,
    title: "Aprende a programar desde cero",
    description: "Cursos prácticos con proyectos reales",
    image: "https://via.placeholder.com/1200x400?text=Slide+1",
  },
  {
    id: 2,
    title: "Domina React y Vue",
    description: "Frameworks modernos para front-end",
    image: "https://via.placeholder.com/1200x400?text=Slide+2",
  },
  {
    id: 3,
    title: "Prepárate para tu carrera tech",
    description: "Formación con mentores y comunidad",
    image: "https://via.placeholder.com/1200x400?text=Slide+3",
  },
];

const packs = [
  { id: 1, name: "Pack Básico", description: "5 cursos básicos para empezar", price: 49 },
  { id: 2, name: "Pack Profesional", description: "10 cursos avanzados + proyectos", price: 99 },
  { id: 3, name: "Pack Completo", description: "Todos los cursos + mentorías", price: 149 },
];

const featuredCourses = [
  { id: 1, title: "Curso de React", hours: 20 },
  { id: 2, title: "Curso de Laravel", hours: 25 },
  { id: 3, title: "Curso de Python", hours: 15 },
];

const testimonials = [
  { id: 1, name: "Ana M.", comment: "Gracias a esta academia conseguí trabajo en 3 meses." },
  { id: 2, name: "Luis P.", comment: "Los profesores son geniales y los cursos muy prácticos." },
  { id: 3, name: "Marta R.", comment: "El pack profesional me cambió la vida." },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "var(--font-family)" }}>
      {/* Slider */}
      <section style={{ position: "relative", marginBottom: "3rem", borderRadius: "var(--border-radius)", overflow: "hidden" }}>
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", top: 20, left: 30, color: "white", textShadow: "1px 1px 6px black" }}>
          <h2 style={{ fontSize: "2rem", margin: 0 }}>{slides[currentSlide].title}</h2>
          <p style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>{slides[currentSlide].description}</p>
        </div>
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          style={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.3)",
            border: "none",
            color: "white",
            fontSize: "1.5rem",
            cursor: "pointer",
            padding: "0.5rem 1rem",
            borderRadius: "var(--border-radius)",
          }}
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          style={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.3)",
            border: "none",
            color: "white",
            fontSize: "1.5rem",
            cursor: "pointer",
            padding: "0.5rem 1rem",
            borderRadius: "var(--border-radius)",
          }}
        >
          ›
        </button>
      </section>

      {/* Packs Disponibles */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "var(--primary-color)" }}>Packs Disponibles</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {packs.map((pack) => (
            <div
              key={pack.id}
              style={{
                flex: "1 1 250px",
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "var(--border-radius)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{pack.name}</h3>
              <p>{pack.description}</p>
              <p style={{ fontWeight: "bold" }}>{`$${pack.price}`}</p>
              <button style={{ marginTop: "1rem" }}>Comprar</button>
            </div>
          ))}
        </div>
      </section>

      {/* Cursos Destacados */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "var(--primary-color)" }}>Cursos Destacados</h2>
        <ul>
          {featuredCourses.map((course) => (
            <li key={course.id} style={{ marginBottom: "0.8rem" }}>
              <strong>{course.title}</strong> - {course.hours} horas
            </li>
          ))}
        </ul>
      </section>

      {/* Testimonios */}
      <section style={{ marginBottom: "3rem", backgroundColor: "white", padding: "1.5rem", borderRadius: "var(--border-radius)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ color: "var(--primary-color)" }}>Testimonios</h2>
        {testimonials.map((t) => (
          <blockquote key={t.id} style={{ marginBottom: "1rem", fontStyle: "italic", borderLeft: "4px solid var(--primary-color)", paddingLeft: "1rem" }}>
            “{t.comment}” — <strong>{t.name}</strong>
          </blockquote>
        ))}
      </section>
    </main>
  );
}
