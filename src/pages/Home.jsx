import Hero from "../components/common/Hero";
import { useLatestCourses } from "../hooks/useFetchLatestCourses";
import { useFetchPacks } from "../hooks/useFetchPacks";

// const packs = [
//   {
//     id: 1,
//     name: "Pack Básico",
//     description: "5 cursos básicos para empezar",
//     price: 49,
//   },
//   {
//     id: 2,
//     name: "Pack Profesional",
//     description: "10 cursos avanzados + proyectos",
//     price: 99,
//   },
//   {
//     id: 3,
//     name: "Pack Completo",
//     description: "Todos los cursos + mentorías",
//     price: 149,
//   },
// ];

const testimonials = [
  {
    id: 1,
    name: "Ana M.",
    comment: "Gracias a esta academia conseguí trabajo en 3 meses.",
  },
  {
    id: 2,
    name: "Luis P.",
    comment: "Los profesores son geniales y los cursos muy prácticos.",
  },
  {
    id: 3,
    name: "Marta R.",
    comment: "El pack profesional me cambió la vida.",
  },
];

export default function Home() {
  const latestCourses = useLatestCourses();
  const packs = useFetchPacks();

  return (
    <>
      <Hero />
      <section id="latest-courses-section" className="section">
        <h2 className="section-title">Últimos Cursos</h2>
        <div className="courses-container">
          {latestCourses.map((course) => (
            <div key={course.id} className="course-card">
              <h3 className="course-title">{course.name}</h3>
              <p className="course-description">{course.description}</p>
              <p className="course-price">
                {course.is_free ? "Gratis" : `$${course.price}`}
              </p>
              <button className="btn btn-secondary">Ver Curso</button>
            </div>
          ))}
        </div>
      </section>

      <section id="packs-section" className="section">
        <h2 className="section-title">Packs Disponibles</h2>
        <div className="packs-container">
          {packs.map((pack) => (
            <div
              key={pack.id}
              className={`pack-card ${pack.is_free ? "pack-free" : ""}`}
            >
              <h3 className="pack-title">{pack.name}</h3>
              <p className="pack-description">{pack.description}</p>
              <p className="pack-price">{`$${pack.price}`}</p>
              <button className="btn btn-primary">{pack.is_free? "Try now" : "Buy"}</button>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials-section" className="section">
        <h2 className="section-title">Testimonios</h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="testimonial-avatar">{t.name.charAt(0)}</div>
              <blockquote className="testimonial-comment">
                “{t.comment}”
              </blockquote>
              <strong className="testimonial-name">{t.name}</strong>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
