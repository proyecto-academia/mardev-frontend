import {create} from 'zustand';

import EnrollmentRepository from '../api/core/EnrollmentRepository';
import {useNotificationStore} from './useNotificationStore';
export const useEnrollmentStore = create((set) => ({
  enrollments: [],
  userEnrollments: [],
  loading: false,

    fetchUserEnrollments: async () => {
    set({loading: true});
    try {
      const response = await EnrollmentRepository.getUserEnrollments();
      console.log('User enrollments fetched:', response);
      set({userEnrollments: response.enrollments});
    } catch (error) {
      const notificationStore = useNotificationStore.getState();
      notificationStore.addNotification({
        type: 'error',
        message: 'Error al cargar las inscripciones del usuario. Por favor, inténtalo de nuevo.',
      });
      console.error('Error fetching user enrollments:', error);
    } finally {
      set({loading: false});
    }
  },

  fetchEnrollments: async () => {
    set({loading: true});
    try {
      const response = await EnrollmentRepository.getEnrollments();
      console.log('Enrollments fetched:', response);
      set({enrollments: response.enrollments});
    } catch (error) {
      const notificationStore = useNotificationStore.getState();
      notificationStore.addNotification({
        type: 'error',
        message: 'Error al cargar las inscripciones. Por favor, inténtalo de nuevo.',
      });
      console.error('Error fetching enrollments:', error);
    } finally {
      set({loading: false});
    }
  },
}));