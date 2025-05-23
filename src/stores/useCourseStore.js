import { create } from 'zustand';
import CourseRepository from '../api/core/CourseRepository';
import { useNotificationStore } from './useNotificationStore';
import MediaRepository from '../api/media/MediaRepository';

export const useCourseStore = create((set) => ({
  courses: [],
  pagination: {},
  loading: false,

  fetchCourses: async (params = {}) => {
    set({ loading: true });
    try {
      const response = await CourseRepository.getCourses(params);
      console.log('Courses:', response); // Log the courses
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
      console.log('Latest courses:', response); // Log the latest courses
      response.forEach(async(course) => {
        course.photo = await MediaRepository.getUrlSingleObject('courses', course.id, 'photo');
      });

      set({ courses: response});
    } catch (error) {
      const notificationStore = useNotificationStore.getState();
      notificationStore.addNotification({
        type: 'error',
        message: 'Error al cargar los cursos. Por favor, inténtalo de nuevo.',
      });
      console.error('Error loading latest courses:', error);
    } finally {
      set({ loading: false });
    }
  },
}));