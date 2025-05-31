import { create } from "zustand";
import EnrollmentRepository from "../api/core/EnrollmentRepository";
import { useNotificationStore } from "./useNotificationStore";

export const useAvailableContentStore = create((set) => ({
    availableCoursesIds: [],
    courses: [],
    loading: false,

    fetchAvailableCourses: async () => {
        if(!localStorage.getItem('token')){
            return;
        }
        set({ loading: true });
        try {
            const response = await EnrollmentRepository.getAvailableCourses();
            console.log("Available courses in useAvailableCOntentStore:", response);

            const courseIds = response.courses.map((course) => course.id);
            set({ availableCoursesIds: courseIds });
            set({ courses: response.courses });
        } catch (error) {
            const notificationStore = useNotificationStore.getState();
            notificationStore.addNotification({
                type: "error",
                message: "Error al cargar los cursos disponibles. Por favor, inténtalo de nuevo.",
            });
            console.error("Error fetching available courses:", error);
        } finally {
            set({ loading: false });
        }
    },
    reset: () => set({ availableCoursesIds: [], courses: [], loading: false}),
}));