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

  const [errors, setErrors] = useState({}); // Estado para almacenar errores

  const validateForm = (name, email, password, passwordConfirmation) => {
    const newErrors = {};

    // Validación de nombre
    if (!name || name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validación de contraseña
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!password || !passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 6 characters long and include both letters and numbers.";
    }

    // Validación de confirmación de contraseña
    if (password !== passwordConfirmation) {
      newErrors.passwordConfirmation = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirmation = e.target.passwordConfirmation.value;

    // Validar el formulario
    const validationErrors = validateForm(name, email, password, passwordConfirmation);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const data = await AuthRepository.register(name, email, password, passwordConfirmation);
      const token = data.access_token;
      const user = data.user;
      authStore.save(user, token);
      if (authStore.isAuthenticated()) {
        notificationStore.addNotification("Registration successful", "success");
        fetchAvailableCourses();
        navigate("/packs");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrors({ general: error.response.data.message });
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
          />
          {errors.name && <small className=" text-danger alert-danger">{errors.name}</small>}
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
            aria-describedby="email-help"
          />
          {errors.email && <small className=" text-danger alert-danger">{errors.email}</small>}
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
          />
          {errors.password && <small className=" text-danger alert-danger">{errors.password}</small>}
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
          />
          {errors.passwordConfirmation && (
            <small className=" text-danger alert-danger">{errors.passwordConfirmation}</small>
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