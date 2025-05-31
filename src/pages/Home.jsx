import Hero from "../components/common/Hero";
import { useLatestCourses } from "../hooks/useFetchLatestCourses";
import { useFetchPacks } from "../hooks/useFetchPacks";
import CoursesList from "../components/lists/CoursesList";
import TestimonialsList from "../components/lists/TestimonialsList";
import PackCard from "../components/cards/PackCard";

export default function Home() {
  const latestCourses = useLatestCourses();
  const packs = useFetchPacks();

  return (
    <>
      <Hero />
      <section id="latest-courses-section" className="section">
        <h2 className="section-title">Últimos Cursos</h2>

        <CoursesList courses={latestCourses} />
      </section>

      <section id="packs-section" className="section">
        <h2 className="section-title">Packs Disponibles</h2>
        <div className="packs-container">
        {packs.map((pack) => (
            <PackCard key={pack.id} pack={pack} />
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
