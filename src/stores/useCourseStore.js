import { create } from "zustand";
import CourseRepository from "../api/core/CourseRepository";
import { useNotificationStore } from "./useNotificationStore";
import MediaRepository from "../api/media/MediaRepository";

const loadInitialCache = () => {
  try {
    const stored = localStorage.getItem("coursesPhotosUrls");
    if (!stored) return [];

    const now = Date.now();
    const parsed = JSON.parse(stored);
    // Filtramos expiradas
    return parsed.filter((obj) => obj.expirationTime > now);
  } catch (e) {
    console.error("Error loading cache from localStorage", e);
    return [];
  }
};

export const useCourseStore = create((set) => ({
  courses: [],
  pagination: {},
  loading: false,
  coursesPhotosUrls: loadInitialCache(),

  fetchCourses: async (params = {}) => {
    set({ loading: true });
    try {
      const response = await CourseRepository.getCourses(params);
      console.log("Courses:", response); // Log the courses
      set({
        courses: response.courses.data,
        pagination: response.pagination,
      });
    } catch (error) {
      const notificationStore = useNotificationStore.getState();
      notificationStore.addNotification({
        type: "error",
        message: "Error al cargar los cursos. Por favor, inténtalo de nuevo.",
      });
      console.error("Error loading courses:", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchLatestCourses: async () => {
    set({ loading: true });
    try {
      const response = await CourseRepository.getLatestCourses();
      console.log("Latest courses:", response);

      const { getUrlFromStore, pushUrlToStore } = useCourseStore.getState();

      const coursesWithPhotos = await Promise.all(
        response.map(async (course) => {
          const cachedUrl = getUrlFromStore(course.id);
          if (cachedUrl) {
            console.log(`Usando foto cacheada de ${course.id}`);
            course.photo = cachedUrl;
          } else {
            console.log(`pido la foto de ${course.id}`);
            const photo = await MediaRepository.getUrlSingleObject(
              "courses",
              course.id,
              "photo"
            );
            const photoUrl = photo?.url || null;
            if (photoUrl) {
              course.photo = photoUrl;
              pushUrlToStore(course.id, photoUrl);
            }
          }
          return course;
        })
      );

      set({ courses: coursesWithPhotos });
    } catch (error) {
      const notificationStore = useNotificationStore.getState();
      notificationStore.addNotification({
        type: "error",
        message: "Error al cargar los cursos. Por favor, inténtalo de nuevo.",
      });
      console.error("Error loading latest courses:", error);
    } finally {
      set({ loading: false });
    }
  },
  //sin cachear
  fetchCoursePhotoWithoutCache: async (id) => {
    try {
      const photo = await MediaRepository.getUrlSingleObject(
        "courses",
        id,
        "photo"
      );
      return photo?.url || null;
    } catch (error) {
      console.error("Error fetching course photo:", error);
      return null;
    }
  },

  pushUrlToStore: (id, url) => {
    const now = Date.now();
    const fifteenMinutes = 15 * 60 * 1000;
    const expirationTime = now + fifteenMinutes;

    set((state) => {
      const updated = [...state.coursesPhotosUrls, { id, url, expirationTime }];
      localStorage.setItem("coursesPhotosUrls", JSON.stringify(updated));
      return { coursesPhotosUrls: updated };
    });
  },

  getUrlFromStore: (id) => {
    const now = Date.now();
    const state = useCourseStore.getState();
    const urlObject = state.coursesPhotosUrls.find((obj) => obj.id === id);

    if (urlObject && urlObject.expirationTime > now) {
      return urlObject.url;
    }

    // Si está expirado o no existe, lo eliminamos
    const updated = state.coursesPhotosUrls.filter((obj) => obj.id !== id);
    set({ coursesPhotosUrls: updated });
    localStorage.setItem("coursesPhotosUrls", JSON.stringify(updated));

    return null;
  },
}));
