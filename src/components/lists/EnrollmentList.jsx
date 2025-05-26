import React from "react";
import EnrollmentCard from "../cards/EnrollmentCard";

export default function EnrollmentList({ enrollments }) {
  if (!enrollments || enrollments.length === 0) {
    return <p>No enrollments available.</p>;
  }

  // Filtrar inscripciones por tipo
  const enrolledCourses = enrollments.filter(
    (enrollment) => enrollment.enrollable_type === "App\\Models\\Course"
  );
  const enrolledPacks = enrollments.filter(
    (enrollment) => enrollment.enrollable_type === "App\\Models\\Pack"
  );

  return (
    <div className="enrollment-list">
      <h2>Enrolled Courses</h2>
      {enrolledCourses.length > 0 ? (
        enrolledCourses.map((enrollment) => (
          <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
        ))
      ) : (
        <p>No enrolled courses available.</p>
      )}

      <h2>Enrolled Packs</h2>
      {enrolledPacks.length > 0 ? (
        enrolledPacks.map((enrollment) => (
          <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
        ))
      ) : (
        <p>No enrolled packs available.</p>
      )}
    </div>
  );
}