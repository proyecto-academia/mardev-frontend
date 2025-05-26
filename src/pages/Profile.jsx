import { useEffect, useRef } from "react";
import UserInfo from "../components/user/UserInfo";
import { useAvailableContentStore } from "../stores/useAvailableContentStore";
import { useEnrollmentStore } from "../stores/useEnrollmentStore";
import { usePurchasesStore } from "../stores/usePurchasesStore";
import CourseList from "../components/lists/CoursesList";
import MediaRepository from "../api/media/MediaRepository";
import EnrollmentList from "../components/lists/EnrollmentList";
import PurchaseList from "../components/lists/PurchaseList";

export default function Profile() {
  const { courses, fetchAvailableCourses } = useAvailableContentStore();
  const hasFetchedPhotos = useRef(false); // Para evitar el bucle infinito
  const {userEnrollments} = useEnrollmentStore();
  const {purchases} = usePurchasesStore();

  useEffect(() => {
    // Cargar los cursos si no están disponibles
    if (!courses || courses.length === 0) {
      fetchAvailableCourses();
    }

    // Evitar volver a procesar las fotos si ya se han cargado
    if (courses && courses.length > 0 && !hasFetchedPhotos.current) {
      hasFetchedPhotos.current = true; // Marcar como procesado
      const fetchPhotos = async () => {
        const updatedCourses = await Promise.all(
          courses.map(async (course) => {
            const photoUrl = await MediaRepository.getUrlSingleObject("courses", course.id, "photo");
            return { ...course, photo: photoUrl.url || null }; // Agregar la URL de la foto
          })
        );
        useAvailableContentStore.setState({ courses: updatedCourses });
      };

      fetchPhotos();
    }
  }, [fetchAvailableCourses, courses]);

  useEffect(() => {
    // Cargar las inscripciones del usuario
    const fetchUserEnrollments = async () => {
      try {
        await useEnrollmentStore.getState().fetchUserEnrollments();
      } catch (error) {
        console.error("Error fetching user enrollments:", error);
      }
    };

    fetchUserEnrollments();
  }
  , []);

  useEffect(() => {
    // Cargar las compras del usuario
    const fetchUserPurchases = async () => {
      try {
        await usePurchasesStore.getState().fetchPurchases();
      } catch (error) {
        console.error("Error fetching user purchases:", error);
      }
    };

    fetchUserPurchases();
  }
  , []);

  return (
    <>
      <h1>User Profile</h1>
      <UserInfo user={JSON.parse(localStorage.getItem("user"))} />
      <h1>My courses</h1>
      <CourseList courses={courses} />
      <h1>Enrollments</h1>
      <EnrollmentList enrollments={userEnrollments} />
      <h1>Purchases</h1>
      <PurchaseList purchases={purchases}  />

    </>
  );
}
