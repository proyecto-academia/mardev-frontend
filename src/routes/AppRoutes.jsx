import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";

// Lazy-loaded pages
const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const CourseList = React.lazy(() => import("../pages/courses/CourseList"));
const CourseDetail = React.lazy(() => import("../pages/courses/CourseDetail"));
const ClassDetail = React.lazy(() => import("../pages/classes/ClassDetail"));
const PackListIncludedCourses = React.lazy(() => import("../pages/packs/PackListIncludedCourses"));
const Profile = React.lazy(() => import("../pages/Profile"));
const CourseBuy = React.lazy(() => import("../pages/courses/CourseBuy"));
const PackBuy = React.lazy(() => import("../pages/packs/PackBuy"));

// Helpers
import PrivateRoute from "./PrivateRoutes";
import NecessaryEnrollmentRoutes from "./NecessaryEnrollmentRoutes";

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          {/* Rutas públicas */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Rutas privadas */}
          <Route element={<PrivateRoute />}>
            <Route element={<PrivateLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/course/:id" element={<Profile />} />
              <Route path="/courses" element={<CourseList />} />
              <Route path="/courses/buy/:id" element={<CourseBuy />} />
              <Route path="/packs" element={<PackListIncludedCourses />} />
              <Route path="/packs/buy/:packId" element={<PackBuy />} />
              <Route element={<NecessaryEnrollmentRoutes />}>
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/courses/:id/classes/:classId" element={<ClassDetail />} />
              </Route>
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
