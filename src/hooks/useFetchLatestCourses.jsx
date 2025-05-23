import { useEffect, useState } from "react";
import { useCourseStore } from "../stores/useCourseStore";

export function useLatestCourses() {
  const { fetchLatestCourses } = useCourseStore();
  const [latestCourses, setLatestCourses] = useState([]);

  useEffect(() => {
    fetchLatestCourses().then(() => {
      setLatestCourses(useCourseStore.getState().courses);
    });
  }, [fetchLatestCourses]);

  return latestCourses;
}
