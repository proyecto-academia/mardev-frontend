import React, { useState, useEffect } from "react";
import CourseCard from "../cards/CourseCard";
import { useCourseStore } from "../../stores/useCourseStore";
import MultiRangeSlider from "multi-range-slider-react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { debounce } from "lodash";

export default function AllCoursesList() {
  const {
    fetchCourses,
    courses,
    pagination = {}, // Default to an empty object if undefined
    loading,
    minPrice,
    maxPrice,
    loadPriceBounds,
  } = useCourseStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState({ orderBy: "id", order: "asc" });
  const [filters, setFilters] = useState({});
  const [priceRange, setPriceRange] = useState(null);

  useEffect(() => {
    loadPriceBounds();
  }, [loadPriceBounds]);

  useEffect(() => {
    if (minPrice === null || maxPrice === null) return;
    setPriceRange([Number(minPrice), Number(maxPrice)]);
  }, [minPrice, maxPrice]);

  // Debounced setter for filters
  const updateFiltersDebounced = React.useMemo(
    () =>
      debounce((newRange) => {
        setFilters({ minPrice: newRange[0], maxPrice: newRange[1] });
      }, 500),
    []
  );

  useEffect(() => {
    return () => updateFiltersDebounced.cancel();
  }, [updateFiltersDebounced]);

  useEffect(() => {
    if (priceRange !== null) {
      updateFiltersDebounced(priceRange);
    }
  }, [priceRange, updateFiltersDebounced]);

  useEffect(() => {
    if (filters.minPrice === undefined || filters.maxPrice === undefined) {
      return;
    }
    if (filters.minPrice === null || filters.maxPrice === null) {
      return;
    }

    fetchCourses({ ...filters, ...order, page: currentPage });
  }, [filters, order, currentPage, fetchCourses]);

  const handleFilter = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
    setCurrentPage(1);
  };

  const handleOrderBy = (orderBy, orderDirection) => {
    setOrder({ orderBy, order: orderDirection });
  };

  const toggleOrderDirection = () => {
    const newOrder = order.order === "asc" ? "desc" : "asc";
    handleOrderBy(order.orderBy, newOrder);
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
    <main className="all-courses-list">
      <section className="filters-section">
        <form className="filters-form" onSubmit={(e) => e.preventDefault()}>
          <div className="filter-group filter-name">
            <label htmlFor="filter-name">Filter by name</label>
            <input
              id="filter-name"
              type="text"
              placeholder="Filter by name"
              onChange={(e) => handleFilter("name", e.target.value)}
            />
          </div>

          <div className="filter-group filter-type">
            <label htmlFor="filter-type">Course Type</label>
            <select
              id="filter-type"
              onChange={(e) => handleFilter("is_free", e.target.value)}
              defaultValue=""
            >
              <option value="">All</option>
              <option value="1">Free</option>
              <option value="0">Paid</option>
            </select>
          </div>

          {minPrice !== null &&
            maxPrice !== null &&
            priceRange !== null &&
            priceRange[0] !== null &&
            priceRange[1] !== null && (
              <div className="filter-group filter-price-range">
                <label htmlFor="price-range">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <MultiRangeSlider
                  id="price-range"
                  min={minPrice}
                  max={maxPrice}
                  step={1}
                  minValue={priceRange[0]}
                  maxValue={priceRange[1]}
                  onChange={({ minValue, maxValue }) => {
                    setPriceRange([minValue, maxValue]);
                  }}
                  style={{
                    border: "none",
                    boxShadow: "none",
                    height: "40px",
                  }}
                  barLeftColor="var(--dark-color)"
                  barRightColor="var(--dark-color)"
                  thumbLeftColor="var(--primary-color)"
                  thumbRightColor="var(--primary-color)"
                  barInnerColor="var(--primary-color)"
                  ruler={false}
                />
              </div>
            )}
        </form>
      </section>

      <section className="sorting-section">
        <div className="sorting-controls">
          <div>
            <label htmlFor="order-by">Sort by:</label>
            <select
              id="order-by"
              value={order.orderBy}
              onChange={(e) => handleOrderBy(e.target.value, order.order)}
            >
              <option value="id">Default</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="estimated_hours">Estimated Hours</option>
            </select>
          </div>
          <button
            aria-label="Toggle sort direction"
            onClick={toggleOrderDirection}
            className="toggle-sort-btn"
          >
            {order.order === "asc" ? (
              <FaArrowUp size={20} />
            ) : (
              <FaArrowDown size={20} />
            )}
          </button>
        </div>
      </section>

      <section className="courses-section">
        {loading &&
        minPrice !== null &&
        maxPrice !== null &&
        priceRange !== null &&
        priceRange[0] !== null &&
        priceRange[1] !== null ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="course-cards-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
      {minPrice !== null &&
        maxPrice !== null &&
        priceRange !== null &&
        priceRange[0] !== null &&
        priceRange[1] !== null && (
          <nav className="pagination" aria-label="Pagination navigation">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {pagination.current_page || 1} of{" "}
              {pagination.total && pagination.per_page
                ? Math.ceil(pagination.total / pagination.per_page)
                : 1}
            </span>
            <button onClick={handleNextPage} disabled={!pagination.next_page}>
              Next
            </button>
          </nav>
        )}
    </main>
  );
}
