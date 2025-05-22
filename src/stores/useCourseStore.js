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


  fetchLatestCourses: async () => {
    set({ loading: true });
    try {
      const response = await CourseRepository.getLatestCourses();
      console.log('Latest courses:', response); // Log the latest courses
      // [
      //   {
      //     "id": 132,
      //     "name": "Director course",
      //     "description": "Learn step-by-step",
      //     "estimated_hours": 20,
      //     "is_free": 0,
      //     "price": "169.16",
      //     "published": 1,
      //     "created_at": "2025-05-21T20:38:22.000000Z",
      //     "updated_at": "2025-05-21T20:38:22.000000Z"
      //   },
      //   {
      //     "id": 131,
      //     "name": "Assistant course",
      //     "description": "Learn step-by-step",
      //     "estimated_hours": 20,
      //     "is_free": 0,
      //     "price": "679.55",
      //     "published": 1,
      //     "created_at": "2025-05-21T20:38:22.000000Z",
      //     "updated_at": "2025-05-21T20:38:22.000000Z"
      //   },
      //   {
      //     "id": 130,
      //     "name": "Analyst course",
      //     "description": "Learn step-by-step",
      //     "estimated_hours": 20,
      //     "is_free": 0,
      //     "price": "428.46",
      //     "published": 1,
      //     "created_at": "2025-05-21T20:38:22.000000Z",
      //     "updated_at": "2025-05-21T20:38:22.000000Z"
      //   },
      //   {
      //     "id": 129,
      //     "name": "Specialist course",
      //     "description": "Learn step-by-step",
      //     "estimated_hours": 20,
      //     "is_free": 0,
      //     "price": "62.65",
      //     "published": 1,
      //     "created_at": "2025-05-21T20:38:22.000000Z",
      //     "updated_at": "2025-05-21T20:38:22.000000Z"
      //   },
      //   {
      //     "id": 128,
      //     "name": "Manager course",
      //     "description": "Learn step-by-step",
      //     "estimated_hours": 20,
      //     "is_free": 0,
      //     "price": "84.30",
      //     "published": 1,
      //     "created_at": "2025-05-21T20:38:21.000000Z",
      //     "updated_at": "2025-05-21T20:38:21.000000Z"
      //   },
      //   {
      //     "id": 125,
      //     "name": "Technician course",
      //     "description": "Learn step-by-step",
      //     "estimated_hours": 20,
      //     "is_free": 0,
      //     "price": "465.59",
      //     "published": 1,
      //     "created_at": "2025-05-21T20:38:21.000000Z",
      //     "updated_at": "2025-05-21T20:38:21.000000Z"
      //   },
      //   {
      //     "id": 126,
      //     "name": "Engineer course",
      //     "description": "Learn step-by-step",
      //     "estimated_hours": 20,
      //     "is_free": 0,
      //     "price": "743.69",
      //     "published": 1,
      //     "created_at": "2025-05-21T20:38:21.000000Z",
      //     "updated_at": "2025-05-21T20:38:21.000000Z"
      //   },
      //   {
      //     "id": 127,
      //     "name": "Agent course",
      //     "description": "Learn step-by-step",
      //     "estimated_hours": 20,
      //     "is_free": 0,
      //     "price": "298.15",
      //     "published": 1,
      //     "created_at": "2025-05-21T20:38:21.000000Z",
      //     "updated_at": "2025-05-21T20:38:21.000000Z"
      //   },
      //   {
      //     "id": 124,
      //     "name": "Facilitator course",
      //     "description": "Learn step-by-step",
      //     "estimated_hours": 20,
      //     "is_free": 0,
      //     "price": "932.75",
      //     "published": 1,
      //     "created_at": "2025-05-21T20:38:20.000000Z",
      //     "updated_at": "2025-05-21T20:38:20.000000Z"
      //   },
      //   {
      //     "id": 122,
      //     "name": "Facilitator course",
      //     "description": "Learn step-by-step",
      //     "estimated_hours": 20,
      //     "is_free": 0,
      //     "price": "868.15",
      //     "published": 1,
      //     "created_at": "2025-05-21T20:38:20.000000Z",
      //     "updated_at": "2025-05-21T20:38:20.000000Z"
      //   }
      // ]
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