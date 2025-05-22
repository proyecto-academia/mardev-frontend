import {useAuthStore} from '../../stores/useAuthStore';
import AuthRepository from '../../api/auth/AuthRepository';
import { useNotificationStore } from '../../stores/useNotificationStore'; 

export default function LoginForm() {

  const authStore = useAuthStore();
  const notificationStore = useNotificationStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { user, token } = await AuthRepository.login(email, password);
      authStore.save(user, token);
      notificationStore.addNotification('Login successful', 'success');
    } catch (error) {
      notificationStore.addNotification('Login failed: ' + error.message, 'error');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input value="marc@gmail.com" name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input value="password1234" name="password" type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}
