import { useAuthStore } from "../../stores/useAuthStore";
import { useAvailableContentStore } from "../../stores/useAvailableContentStore";
import AuthRepository from "../../api/auth/AuthRepository";
import { useNotificationStore } from "../../stores/useNotificationStore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterForm() {
  const authStore = useAuthStore();
  const notificationStore = useNotificationStore();
  const navigate = useNavigate();
  const fetchAvailableCourses = useAvailableContentStore((state) => state.fetchAvailableCourses);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [hasErrors, setHasErrors] = useState(false);

  const validateForm = (field) => {
    const newErrors = { ...errors };

    if (field === "name" || field === "all") {
      if (!formData.name || formData.name.length < 2) {
        newErrors.name = "Name must be at least 2 characters.";
      } else {
        delete newErrors.name;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (field === "email" || field === "all") {
      if (!formData.email || !emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      } else {
        delete newErrors.email;
      }
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (field === "password" || field === "all") {
      if (!formData.password || !passwordRegex.test(formData.password)) {
        newErrors.password =
          "Password must be at least 6 characters long and include both letters and numbers.";
      } else {
        delete newErrors.password;
      }
    }

    if (field === "passwordConfirmation" || field === "all") {
      if (formData.password !== formData.passwordConfirmation) {
        newErrors.passwordConfirmation = "Passwords do not match.";
      } else {
        delete newErrors.passwordConfirmation;
      }
    }

    setErrors(newErrors);
    setHasErrors(Object.keys(newErrors).length > 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (hasErrors) {
      validateForm(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateForm("all");
    if (Object.keys(errors).length > 0) {
      setHasErrors(true);
      return;
    }

    try {
      const data = await AuthRepository.register(
        formData.name,
        formData.email,
        formData.password,
        formData.passwordConfirmation
      );
      const token = data.access_token;
      const user = data.user;
      authStore.save(user, token);
      if (authStore.isAuthenticated()) {
        notificationStore.addNotification("Registration successful", "success");
        fetchAvailableCourses();
        navigate("/packs");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const responseErrors = error.response.data.errors || {};
        const newErrors = {};

        Object.keys(responseErrors).forEach((field) => {
          newErrors[field] = responseErrors[field].join(" ");
        });

        setErrors(newErrors);
        setHasErrors(Object.keys(newErrors).length > 0);

        if (!Object.keys(newErrors).length && error.response.data.message) {
          setErrors({ general: error.response.data.message });
          setHasErrors(true);
        }
      }
      notificationStore.addNotification("Registration failed: " + error.message, "error");
    }
  };

  return (
    <>
      <form id="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        {errors.general && (
          <div className="alert alert-danger" role="alert">
            {errors.general}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="name-input" className="form-label">
            Name
          </label>
          <input
            id="name-input"
            name="name"
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <small className="alert-danger text-danger">{errors.name}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="email-input" className="form-label">
            Email Address
          </label>
          <input
            id="email-input"
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="alert-danger text-danger">{errors.email}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="password-input" className="form-label">
            Password
          </label>
          <input
            id="password-input"
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <small className="alert-danger text-danger">{errors.password}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="password-confirmation-input" className="form-label">
            Confirm Password
          </label>
          <input
            id="password-confirmation-input"
            name="passwordConfirmation"
            type="password"
            className="form-control"
            placeholder="Confirm your password"
            value={formData.passwordConfirmation}
            onChange={handleChange}
          />
          {errors.passwordConfirmation && (
            <small className="alert-danger text-danger">{errors.passwordConfirmation}</small>
          )}
        </div>

        <button id="submit-button" type="submit" className="btn btn-primary">
          Register
        </button>
        <div className="form-group">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="secondary-link">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}