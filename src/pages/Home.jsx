import Hero from "../components/common/Hero";
import { useLatestCourses } from "../hooks/useFetchLatestCourses";
import { useFetchPacks } from "../hooks/useFetchPacks";
import LatestsCoursesList from "../components/lists/LatestsCoursesList";
import TestimonialsList from "../components/lists/TestimonialsList";
export default function Home() {
  const latestCourses = useLatestCourses();
  const packs = useFetchPacks();

  return (
    <>
      <Hero />
      <section id="latest-courses-section" className="section">
        <h2 className="section-title">Últimos Cursos</h2>
        <LatestsCoursesList courses={latestCourses} />
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
        <TestimonialsList />
      </section>
    </>
  );
}
