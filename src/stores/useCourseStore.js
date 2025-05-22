import { create } from 'zustand';
import CourseRepository from '../api/core/CourseRepository';
import { useNotificationStore } from './useNotificationStore';

export const useCourseStore = create((set) => ({
  courses: [],
  pagination: {},
  loading: false,

  fetchCourses: async () => {
    set({ loading: true });
    try {
      const response = await CourseRepository.getCourses();
      set({ courses: response.data.courses, pagination: response.data.pagination });
    } catch (error) {
      const notificationStore = useNotificationStore.getState();
      notificationStore.addNotification({
        type: 'error',
        message: 'Error al cargar los cursos. Por favor, inténtalo de nuevo.',
      });
      console.error('Error loading courses:', error);
    } finally {
      set({ loading: false });
    }
  },
}));