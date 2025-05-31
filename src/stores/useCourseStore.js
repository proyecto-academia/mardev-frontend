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
  singleCourse:null,
  courses: [],
  pagination: {},
  loading: false,
  coursesPhotosUrls: loadInitialCache(),
  minPrice: null, // Valor predeterminado
  maxPrice: null, // Valor predeterminado

  // Método para cargar los límites de precios desde la API
  loadPriceBounds: async () => {
    try {
      if (localStorage.getItem("coursesPriceBounds")) {
        const cachedBounds = JSON.parse(
          localStorage.getItem("coursesPriceBounds")
        );
        const now = Date.now();
        if (cachedBounds.timestamp > now) {
          set({
            minPrice: cachedBounds.minPrice,
            maxPrice: cachedBounds.maxPrice,
          });
          return; // Usar los valores en caché
        }
        localStorage.removeItem("coursesPriceBounds"); // Limpiar si está expirado
      }

      const min = await CourseRepository.getMinPrice();
      const max = await CourseRepository.getMaxPrice();

      localStorage.setItem(
        "coursesPriceBounds",
        JSON.stringify({
          minPrice: min?.minPrice ?? 0,
          maxPrice: max?.maxPrice ?? 1000,
          timestamp: Date.now() + 5 * 60 * 1000,
        })
      );

      set({
        minPrice: min?.minPrice ?? 0,
        maxPrice: max?.maxPrice ?? 1000,
      });
    } catch (e) {
      console.error("Error loading price bounds", e);
    }
  },

  fetchCourses: async (params = {}) => {
    set({ loading: true });
    try {
      const response = await CourseRepository.getCourses(params);
      console.log("Courses:", response); // Log the courses
      const { getUrlFromStore, pushUrlToStore } = useCourseStore.getState();
      const coursesWithPhotos = await Promise.all(
        response.courses.data.map(async (course) => {
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
      set({
        courses: coursesWithPhotos,
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

  fetchCourse: async (id) => {
    set({ loading: true });
    try {
      const response = await CourseRepository.getCourse(id);
      console.log("Course:", response); // Log the course
      const { getUrlFromStore, pushUrlToStore } = useCourseStore.getState();
      const course = response;
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
      set({ singleCourse: course });
      return course;
    } catch (error) {
      const notificationStore = useNotificationStore.getState();
      notificationStore.addNotification({
        type: "error",
        message: "Error al cargar el curso. Por favor, inténtalo de nuevo.",
      });
      console.error("Error loading course:", error);
      set({ singleCourse: null });
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

  fetchCoursesByPack: async (packId) => {
    set({ loading: true });
    try {
      // Verificar si los cursos del pack están en caché
      const cachedPackCourses = localStorage.getItem(`packCourses_${packId}`);
      const now = Date.now();

      if (cachedPackCourses) {
        const parsedCache = JSON.parse(cachedPackCourses);
        if (parsedCache.expirationTime > now) {
          console.log(`Usando cursos cacheados para el pack ${packId}`);
          set({ courses: parsedCache.courses });
          set({ loading: false });
          return; // Usar los datos en caché
        }
        // Si está expirado, eliminarlo
        localStorage.removeItem(`packCourses_${packId}`);
      }

      // Si no hay caché válido, hacer la solicitud a la API
      const response = await CourseRepository.getCoursesByPackId(packId);
      console.log("Courses by pack:", response); // Log the courses by pack

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

      // Guardar los cursos en caché con una expiración de 15 minutos
      const fifteenMinutes = 15 * 60 * 1000;
      const expirationTime = now + fifteenMinutes;
      localStorage.setItem(
        `packCourses_${packId}`,
        JSON.stringify({ courses: coursesWithPhotos, expirationTime })
      );

      set({
        courses: coursesWithPhotos,
        pagination: response.pagination,
      });
    } catch (error) {
      const notificationStore = useNotificationStore.getState();
      notificationStore.addNotification({
        type: "error",
        message: "Error al cargar los cursos del pack. Por favor, inténtalo de nuevo.",
      });
      console.error("Error loading courses by pack:", error);
    } finally {
      set({ loading: false });
    }
  },
  reset: () => set({
    singleCourse: null,
    courses: [],
    pagination: {},
    loading: false,
    coursesPhotosUrls: loadInitialCache(),
    minPrice: null,
    maxPrice: null,
  }),
}));
