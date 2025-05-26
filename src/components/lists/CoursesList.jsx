import React from "react";
import CourseCard from "../cards/CourseCard";
export default function CoursesList({ courses }) {
  return (
    <div className="courses-container">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
