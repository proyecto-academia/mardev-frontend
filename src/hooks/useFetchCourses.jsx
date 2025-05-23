import { useEffect, useState } from "react";
import { useCourseStore } from "../stores/useCourseStore";

export function useFetchCourses() {
  const { fetchCourses } = useCourseStore();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then(() => {
      setCourses(useCourseStore.getState().courses);
    });
  }, [fetchCourses]);

  return courses;
}
