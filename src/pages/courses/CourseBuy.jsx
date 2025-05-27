import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaymentProvider from "../../components/checkout/PaymentProvider";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import { useCourseStore } from "../../stores/useCourseStore";

export default function CourseBuy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const itemType = "course"; // Tipo de ítem ("course" o "pack")
  const token = localStorage.getItem("token"); // Token de autenticación
  const { singleCourse, fetchCourse } = useCourseStore();

  useEffect(() => {
    const fetchCourseIfNeeded = async () => {
      if (singleCourse == null || singleCourse.id !== parseInt(id)) {
        await fetchCourse(id);
      }
    };
    fetchCourseIfNeeded();
  }, [singleCourse, fetchCourse, id]);

  useEffect(() => {
    if (singleCourse?.is_free) {
      navigate("/packs", { replace: true }); // Redirige a /packs si el curso es gratuito
    }
  }, [singleCourse, navigate]);

  if (!singleCourse) {
    return <p>Loading course details...</p>;
  }

  return (
    <section className="course-buy">
      <article className="course-buy-details">
        <header>
          <h1>{singleCourse.name}</h1>
          <p>{singleCourse.description}</p>
        </header>
        <img src={singleCourse.photo} alt={singleCourse.name} />
        
      </article>
      <div className="checkout-container">
        <h2>Checkout</h2>
        <PaymentProvider itemId={id} itemType={itemType} token={token}>
          <CheckoutForm token={token} successUrl={`/profile/course/${id}`}/>
          <ul>
          <li>
            <strong>Estimated Hours:</strong> {singleCourse.estimated_hours}
          </li>
          <li>
            <strong>Price:</strong>{" "}
            {singleCourse.is_free ? "Free" : `$${singleCourse.price}`}
          </li>
          <li>
            <strong>Published:</strong>{" "}
            {new Date(singleCourse.created_at).toLocaleDateString()}
          </li>
        </ul>
        </PaymentProvider>
      </div>
    </section>
  );
}
