import { create } from "zustand";
import ClassRepository from "../api/core/ClassRepository";
import MediaRepository from "../api/media/MediaRepository";
import { useNotificationStore } from "./useNotificationStore";
import { SiN26 } from "react-icons/si";

const loadInitialCache = () => {
  try {
    const stored = localStorage.getItem("classesMediaUrls");
    if (!stored) return [];

    const now = Date.now();
    const parsed = JSON.parse(stored);
    // Filtramos URLs expiradas
    return parsed.filter((obj) => obj.expirationTime > now);
  } catch (e) {
    console.error("Error loading cache from localStorage", e);
    return [];
  }
};

export const useClassStore = create((set) => ({
  classes: [],
  loading: false,
  classesMediaUrls: loadInitialCache(),

  fetchClasses: async (params = {}) => {
    set({ loading: true });
    try {
      const response = await ClassRepository.getClasses(params);
      console.log("Classes:", response);

      const { getUrlFromStore, pushUrlToStore } = useClassStore.getState();

      const classesWithMedia = await Promise.all(
        response.classes.map(async (classItem) => {
          // Fetch photo
          const cachedPhotoUrl = getUrlFromStore(classItem.id, "photo");
          if (cachedPhotoUrl) {
            console.log(`Using cached photo for class ${classItem.id}`);
            classItem.photo = cachedPhotoUrl;
          } else {
            const photo = await MediaRepository.getUrlSingleObject(
              "classes",
              classItem.id,
              "photo"
            );
            const photoUrl = photo?.url || null;
            if (photoUrl) {
              classItem.photo = photoUrl;
              pushUrlToStore(classItem.id, photoUrl, "photo");
            }
          }

          // Fetch video
          const cachedVideoUrl = getUrlFromStore(classItem.id, "video");
          if (cachedVideoUrl) {
            console.log(`Using cached video for class ${classItem.id}`);
            classItem.video = cachedVideoUrl;
          } else {
            const video = await MediaRepository.getUrlSingleObject(
              "classes",
              classItem.id,
              "video"
            );
            console
            const videoUrl = video.url || null;
            console.log(`Video URL for class ${classItem.id}:`, videoUrl);
            if (videoUrl) {
              classItem.video = videoUrl;
              pushUrlToStore(classItem.id, videoUrl, "video");
            }
          }

          return classItem;
        })
      );

      set({ classes: classesWithMedia });
    } catch (error) {
      const notificationStore = useNotificationStore.getState();
      notificationStore.addNotification({
        type: "error",
        message: "Error loading classes. Please try again.",
      });
      console.error("Error loading classes:", error);
    } finally {
      set({ loading: false });
    }
  },

  pushUrlToStore: (id, url, type) => {
    const now = Date.now();
    const fifteenMinutes = 15 * 60 * 1000;
    const expirationTime = now + fifteenMinutes;

    set((state) => {
      const updated = [
        ...state.classesMediaUrls,
        { id, url, type, expirationTime },
      ];
      localStorage.setItem("classesMediaUrls", JSON.stringify(updated));
      return { classesMediaUrls: updated };
    });
  },

  getUrlFromStore: (id, type) => {
    const now = Date.now();
    const state = useClassStore.getState();
    const urlObject = state.classesMediaUrls.find(
      (obj) => obj.id === id && obj.type === type
    );

    if (urlObject && urlObject.expirationTime > now) {
      return urlObject.url;
    }

    // Si está expirado o no existe, lo eliminamos
    const updated = state.classesMediaUrls.filter(
      (obj) => !(obj.id === id && obj.type === type)
    );
    set({ classesMediaUrls: updated });
    localStorage.setItem("classesMediaUrls", JSON.stringify(updated));

    return null;
  },
}));
