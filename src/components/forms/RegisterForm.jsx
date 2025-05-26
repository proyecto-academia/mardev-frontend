import { useAuthStore } from "../../stores/useAuthStore";
import AuthRepository from "../../api/auth/AuthRepository";
import { useNotificationStore } from "../../stores/useNotificationStore";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const authStore = useAuthStore();
  const notificationStore = useNotificationStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirmation = e.target.passwordConfirmation.value;
    const name = e.target.name.value;

    if (password !== passwordConfirmation) {
      notificationStore.addNotification(
        "Passwords do not match. Please try again.",
        "error"
      );
      return;
    }

    try {
      const { user, token } = await AuthRepository.register(
        name,
        email,
        password,
        passwordConfirmation
      );
      authStore.save(user, token);
      if (authStore.isAuthenticated()) {
        notificationStore.addNotification("Registration successful", "success");
        navigate("/packs");
      }
    } catch (error) {
      notificationStore.addNotification(
        "Registration failed: " + error.message,
        "error"
      );
    }
  };

  return (
    <>
      <form id="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
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