import { useAuthStore } from "../../stores/useAuthStore";
import { useAvailableContentStore } from "../../stores/useAvailableContentStore";
import AuthRepository from "../../api/auth/AuthRepository";
import { useNotificationStore } from "../../stores/useNotificationStore";
import { Link, useNavigate } from "react-router-dom";
import { resetAllStores } from "../../helpers/resetAllStores";
import { useState } from "react";

export default function LoginForm() {
  const authStore = useAuthStore();
  const notificationStore = useNotificationStore();
  const fetchAvailableCourses = useAvailableContentStore((state) => state.fetchAvailableCourses)
  const [errrorText, setErrorText] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { user, token } = await AuthRepository.login(email, password);
      resetAllStores(); // Reset all stores to clear previous state
      authStore.save(user, token);
      if (authStore.isAuthenticated()) {
        notificationStore.addNotification("Login successful", "success");
        fetchAvailableCourses();
        navigate("/courses");
      }
    } catch (error) {
      console.error("Login error:", error);
      if(error.response && error.response.data && error.response.data.message) {
        setErrorText(error.response.data.message);
      }
      notificationStore.addNotification(
        "Login failed: " + error.message,
        "error"
      );
    }
  };

  return (
    <>
      <form id="login-form" onSubmit={handleSubmit}>
        <h1>Login form</h1>
        {errrorText && (
          <div className="alert alert-danger" role="alert">
            {errrorText}
          </div>
        )}
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
          <small id="email-help" className="form-text">
            We'll never share your email with anyone else.
          </small>
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
        </div>

        <button id="submit-button" type="submit" className="btn btn-primary">
          Login
        </button>
        <div className="form-group">
          <p>
           
            <Link to="/register" className="secondary-link" >
            Don't have an account?
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
