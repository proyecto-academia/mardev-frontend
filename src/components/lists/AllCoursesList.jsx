import React, { useState, useEffect } from "react";
import CourseCard from "../cards/CourseCard";
import { useCourseStore } from "../../stores/useCourseStore";

export default function AllCoursesList() {
  const { fetchCourses, courses, pagination, loading } = useCourseStore();
  const [filters, setFilters] = useState({});
  const [order, setOrder] = useState({ orderBy: "id", order: "asc" });
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch courses when filters, order, or page changes
  useEffect(() => {
    fetchCourses({ ...filters, ...order, page: currentPage });
  }, [filters, order, currentPage, fetchCourses]);

  // Handlers for filtering, ordering, and pagination
  const handleFilter = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handleOrderBy = (orderBy, orderDirection) => {
    setOrder({ orderBy, order: orderDirection });
  };

  const handleNextPage = () => {
    if (pagination.next_page) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="all-courses-list">
      {/* Course Filter */}
      <div className="course-filter">
        <input
          type="text"
          placeholder="Filter by name"
          onChange={(e) => handleFilter("name", e.target.value)}
        />
        <select onChange={(e) => handleFilter("is_free", e.target.value)}>
          <option value="">All</option>
          <option value="1">Free</option>
          <option value="0">Paid</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          onChange={(e) => handleFilter("minPrice", e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) => handleFilter("maxPrice", e.target.value)}
        />
      </div>

      {/* Order By */}
      <div className="order-by">
        <select
          onChange={(e) =>
            handleOrderBy(e.target.value, order.order === "asc" ? "desc" : "asc")
          }
        >
          <option value="id">Default</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="published">Published</option>
          <option value="estimated_hours">Estimated Hours</option>
        </select>
      </div>

      {/* Course Cards */}
      <div className="course-cards">
        {loading ? (
          <p>Loading...</p>
        ) : (
          courses.map((course) => <CourseCard key={course.id} course={course} />)
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {pagination.current_page} of{" "}
          {Math.ceil(pagination.total / pagination.per_page)}
        </span>
        <button onClick={handleNextPage} disabled={!pagination.next_page}>
          Next
        </button>
      </div>
    </div>
  );
}
