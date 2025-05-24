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
    pagination,
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
    <div className="all-courses-list">
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

        {/* Price Range Slider */}
        {minPrice !== null &&
          maxPrice !== null &&
          priceRange !== null &&
          priceRange[0] !== null &&
          priceRange[1] !== null && (
            <div style={{ margin: "2rem 0", padding: "0 1rem" }}>
              <label>
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <MultiRangeSlider
                min={minPrice}
                max={maxPrice}
                step={1}
                minValue={priceRange[0]}
                maxValue={priceRange[1]}
                onChange={({ minValue, maxValue }) => {
                    console.log("Price Range Changed:", minValue, maxValue);
                  setPriceRange([minValue, maxValue]);
                }}
                style={{
                  // Puedes agregar estilos personalizados aquí si quieres
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
      </div>

      <div
        className="order-by"
        style={{ display: "flex", alignItems: "center", gap: "1rem" }}
      >
        <select
          value={order.orderBy}
          onChange={(e) => handleOrderBy(e.target.value, order.order)}
        >
          <option value="id">Default</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="published">Published</option>
          <option value="estimated_hours">Estimated Hours</option>
        </select>
        <button
          onClick={toggleOrderDirection}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--dark-color)",
          }}
        >
          {order.order === "asc" ? (
            <FaArrowUp size={20} />
          ) : (
            <FaArrowDown size={20} />
          )}
        </button>
      </div>

      <div className="course-cards">
        {loading ? (
          <p>Loading...</p>
        ) : (
          courses.map((course) => <CourseCard key={course.id} course={course} />)
        )}
      </div>

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
