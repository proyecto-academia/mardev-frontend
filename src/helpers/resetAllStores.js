import { useAuthStore } from "../stores/useAuthStore";
import { usePackStore } from "../stores/usePackStore";
import { useEnrollmentStore } from "../stores/useEnrollmentStore";
import { useAvailableContentStore } from "../stores/useAvailableContentStore";
import { useNotificationStore } from "../stores/useNotificationStore";
import { useCourseStore } from "../stores/useCourseStore";
import { usePurchasesStore } from "../stores/usePurchasesStore";
import { useClassStore } from "../stores/useClassStore";

export const resetAllStores = () => {
  const authStore = useAuthStore.getState();
  const packStore = usePackStore.getState();
  const enrollmentStore = useEnrollmentStore.getState();
  const availableContentStore = useAvailableContentStore.getState();
  const notificationStore = useNotificationStore.getState();
  const courseStore = useCourseStore.getState();
  const purchasesStore = usePurchasesStore.getState();
  const classStore = useClassStore.getState();

  authStore.reset();
  packStore.reset();
  enrollmentStore.reset();
  availableContentStore.reset();
  notificationStore.reset();
  courseStore.reset();
  purchasesStore.reset();
  classStore.reset();

  localStorage.clear();
  sessionStorage.clear();

  console.log("All stores have been reset.");
}