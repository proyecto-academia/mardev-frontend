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
  const itemType = "pack"; // Tipo de ítem ("course" o "pack")
  const token = localStorage.getItem("token"); // Token de autenticación
  const singlePack = usePackStore((state) => state.singlePack);
  const fetchPack = usePackStore((state) => state.fetchPack);
  const fetchCoursesByPack = useCourseStore(
    (state) => state.fetchCoursesByPack
  );
  const availableCourses = useCourseStore.getState().courses;


  console.log("[PackBuy] packId from useParams:", packId);
  console.log("[PackBuy] singlePack before fetch:", singlePack);

  useEffect(() => {
    const fetchPackIfNeeded = async () => {
      console.log("[PackBuy] Checking if pack needs to be fetched...");
      if (singlePack == null || singlePack.id !== parseInt(packId)) {
        console.log("[PackBuy] Fetching pack with ID:", packId);
        try {
          await fetchPack(packId);

          console.log("[PackBuy] Pack fetched successfully.", singlePack);
        } catch (error) {
          console.error("[PackBuy] Error fetching pack:", error);
        }
      } else {
        console.log("[PackBuy] Pack already loaded:", singlePack);
      }
    };

    const fetchCoursesIfNeeded = async () => {
        console.log("[PackBuy] Checking if courses need to be fetched...");
        if (availableCourses.length === 0) {
            console.log("[PackBuy] Fetching courses for pack ID:", packId);
            try {
            await fetchCoursesByPack(packId);
            console.log("[PackBuy] Courses fetched successfully.");
            } catch (error) {
            console.error("[PackBuy] Error fetching courses:", error);
            }
        } else {
            console.log("[PackBuy] Courses already loaded:", availableCourses);
        }
        }
    fetchPackIfNeeded();
    fetchCoursesIfNeeded();
  }, [singlePack, fetchPack, packId, fetchCoursesByPack, availableCourses]);
  const fetchAvailableCourses = useAvailableContentStore(
    (state) => state.fetchAvailableCourses
  );

  useEffect(() => {
    const checkIfPackIsFree = async () => {
      console.log("[PackBuy] Checking if pack is free...");
      console.log("is_free boolean", !!singlePack?.is_free);
      console.log("singlePack is_free", singlePack);
      if (singlePack?.is_free) {
        try {
          console.log("[PackBuy] Pack is free, enrolling...");
          await useEnrollmentStore.getState().createPackEnrollment(packId);

          console.log("[PackBuy] Enrollment successful, redirecting...");
          fetchAvailableCourses(); 

          navigate("/packs", { replace: true });
        } catch (error) {
          console.error("[PackBuy] Error enrolling in free pack:", error);
        }
      }
    };

    checkIfPackIsFree();
  }, [singlePack, navigate, packId, fetchAvailableCourses]);

  if (!singlePack || availableCourses.length === 0 || singlePack.id !== parseInt(packId)) {
    console.log(
      "[PackBuy] singlePack is null or undefined, showing loading message..."
    );
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
          speed={3000} // más alto = más suave
          breakpoints={{
            320: {
              slidesPerView: 1, // Para dispositivos pequeños
            },
            768: {
              slidesPerView: 2, // Para tablets
            },
            1024: {
              slidesPerView: 3, // Para pantallas grandes
            },
            1440: {
              slidesPerView: 4, // Para pantallas muy grandes
            },
            1700: {
              slidesPerView: 5, // Para pantallas ultra grandes
            },
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
