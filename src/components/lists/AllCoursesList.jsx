import React, { useState, useEffect } from "react";
import CourseCard from "../cards/CourseCard";
import { useCourseStore } from "../../stores/useCourseStore";
import { Range } from "react-range";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { debounce } from "lodash";

const MIN = 0;
const MAX = 1000;

export default function AllCoursesList() {
  const { fetchCourses, courses, pagination, loading } = useCourseStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState({ orderBy: "id", order: "asc" });
  const [priceRange, setPriceRange] = useState([MIN, MAX]);

  const [filters, setFilters] = useState({
    minPrice: MIN,
    maxPrice: MAX,
  });

  // Debounced setter for filters
  const updateFiltersDebounced = React.useMemo(
    () =>
      debounce((newRange) => {
        setFilters({ minPrice: newRange[0], maxPrice: newRange[1] });
      }, 500),
    []
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => updateFiltersDebounced.cancel();
  }, [updateFiltersDebounced]);

  // Update filters when priceRange changes, using debounce
  useEffect(() => {
    updateFiltersDebounced(priceRange);
  }, [priceRange, updateFiltersDebounced]);

  // Fetch courses when filters, order, or page changes
  useEffect(() => {
    fetchCourses({ ...filters, ...order, page: currentPage });
  }, [filters, order, currentPage, fetchCourses]);

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

        {/* Slider de rango de precios */}
        <div style={{ margin: "2rem 0", padding: "0 1rem" }}>
          <label>
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <Range
            step={10}
            min={MIN}
            max={MAX}
            values={priceRange}
            onChange={setPriceRange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  background: `linear-gradient(to right, #ccc ${((priceRange[0] - MIN) / (MAX - MIN)) * 100}%, #0c66ee ${((priceRange[0] - MIN) / (MAX - MIN)) * 100}% ${((priceRange[1] - MIN) / (MAX - MIN)) * 100}%, #ccc ${((priceRange[1] - MIN) / (MAX - MIN)) * 100}%)`,
                  borderRadius: "3px",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => {
                const { key, ...rest } = props;
                return (
                  <div
                    key={key}  // Pass key explicitly here
                    {...rest}  // Spread all other props
                    style={{
                      ...rest.style,
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#0c66ee",
                      boxShadow: "0px 2px 6px #aaa",
                    }}
                  />
                );
            }}
          />
        </div>
      </div>

      {/* Ordenar */}
      <div className="order-by" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
        <button onClick={toggleOrderDirection} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dark-color)" }}>
          {order.order === "asc" ? <FaArrowUp size={20} /> : <FaArrowDown size={20} />}
        </button>
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