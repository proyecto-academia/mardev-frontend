import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaymentProvider from "../../components/checkout/PaymentProvider";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import { usePackStore } from "../../stores/usePackStore";
import { useEnrollmentStore } from "../../stores/useEnrollmentStore";
import { useCourseStore } from "../../stores/useCourseStore";
import { useAvailableContentStore } from "../../stores/useAvailableContentStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Atropos from "atropos/react";

export default function PackBuy() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const itemType = "pack";
  const token = localStorage.getItem("token");

  const singlePack = usePackStore((state) => state.singlePack);
  const fetchPack = usePackStore((state) => state.fetchPack);
  const packLoading = usePackStore((state) => state.loading);

  const fetchCoursesByPack = useCourseStore((state) => state.fetchCoursesByPack);
  const availableCourses = useCourseStore.getState().courses;

  const fetchAvailableCourses = useAvailableContentStore(
    (state) => state.fetchAvailableCourses
  );

  // ✅ Fetch pack and its courses whenever packId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("[PackBuy] Fetching pack and courses for ID:", packId);
        await fetchPack(packId);
        await fetchCoursesByPack(packId);
        console.log("[PackBuy] Data fetched successfully.");
      } catch (error) {
        console.error("[PackBuy] Error fetching data:", error);
      }
    };

    fetchData();
  }, [packId, fetchPack, fetchCoursesByPack]);

  // ✅ Enroll if pack is free (after loading is complete)
  useEffect(() => {
    const checkIfPackIsFree = async () => {
      if (
        packLoading ||
        !singlePack ||
        singlePack.id !== parseInt(packId)
      ) {
        return;
      }

      if (singlePack.is_free) {
        try {
          console.log("[PackBuy] Pack is free, enrolling...");
          await useEnrollmentStore.getState().createPackEnrollment(packId);
          await fetchAvailableCourses();
          navigate("/packs", { replace: true });
        } catch (error) {
          console.error("[PackBuy] Error enrolling in free pack:", error);
        }
      }
    };

    checkIfPackIsFree();
  }, [packLoading, singlePack, packId, fetchAvailableCourses, navigate]);

  // ✅ Wait until everything is ready
  if (
    packLoading ||
    !singlePack ||
    availableCourses.length === 0 ||
    singlePack.id !== parseInt(packId)
  ) {
    console.log("[PackBuy] Loading state...");
    return <p>Loading pack details...</p>;
  }

  console.log("[PackBuy] Rendering pack details:", singlePack);

  return (
    <>
      <section className="pack-buy">
        <div className="checkout-container">
          <h2>Checkout</h2>
          <PaymentProvider itemId={packId} itemType={itemType} token={token}>
            <CheckoutForm
              token={token}
              successUrl={`/profile/pack/${packId}`}
            />
            <ul>
              <li>
                <strong>Pack Name:</strong> {singlePack.name}
              </li>
              <li>
                <strong>Courses included:</strong> {availableCourses.length}
              </li>
              <li>
                <strong>Price:</strong>{" "}
                {singlePack.is_free ? "Free" : `$${singlePack.price}`}
              </li>
              <li>
                <strong>Published:</strong>{" "}
                {new Date(singlePack.created_at).toLocaleDateString()}
              </li>
            </ul>
          </PaymentProvider>
        </div>
      </section>

      <section className="pack-available-courses-auto-slider-container">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="3"
          spaceBetween={20}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={3000}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
            1700: { slidesPerView: 5 },
          }}
        >
          {availableCourses.map((course) => (
            <SwiperSlide key={course.id}>
              <Atropos
                className="course-atropos-card"
                rotate={true}
                shadow={false}
                style={{ width: "350px", height: "500px" }}
              >
                <img
                  src={course.photo}
                  alt={course.name}
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    height: 'auto',
                    objectFit: "contain",
                  }}
                />
                <h3>{course.name}</h3>
                <p className="course-price">${course.price}</p>
                <p>{course.description}</p>
              </Atropos>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
