import { useState } from 'react';
import { useErrorContext } from './contexts/ErrorContext';
import './App.css';
import AuthRepository from './api/auth/AuthRepository';
import MediaRepository from './api/media/MediaRepository';

function App() {
  const [userData, setUserData] = useState(null);
  const [currentToken, setCurrentToken] = useState(null);

  // Estados para los formularios
  const [loginEmail, setLoginEmail] = useState('test@gmail');
  const [loginPassword, setLoginPassword] = useState('password1234');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirmation, setRegisterPasswordConfirmation] = useState('');

  const [message, setMessage] = useState(null);

  const { state, dispatch } = useErrorContext(); // Obtén el estado y dispatch del contexto

  const setErrors = (data) => {
    if( data.success === true) {
      return;
    }
    if (data.errors) {
      Object.values(data.errors).forEach((errorArray) => {
        errorArray.forEach((error) => {
          dispatch({ type: 'ADD_ERROR', payload: error }); // Agregar error al contexto
        });
      });

      
    }

    if (data.errors == null) {
      dispatch({ type: 'ADD_ERROR', payload: data.message }); // Agregar error al contexto
    }
  };

  const handleLogin = async () => {
    try {
      const data = await AuthRepository.login(loginEmail, loginPassword);
      console.log('Login data:', data);
      console.log('User data:', AuthRepository.getUser());//
      setCurrentToken(AuthRepository.getUser().access_token || null);
      
      setErrors(data); 

    } catch (error) {
      
      console.error('Login error:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const data = await AuthRepository.register(registerName, registerEmail, registerPassword, registerPasswordConfirmation);
      console.log('Registration data:', data);
      setCurrentToken(AuthRepository.getUser().access_token || null);

      setErrors(data); 

    } catch (error) {
      const errorMessage = error.message || 'Registration failed';
      dispatch({ type: 'ADD_ERROR', payload: errorMessage }); // Agregar error al contexto
      console.error('Registration error:', error);
    }
  };

  const handleFetchUser = async () => {
    try {
      const data = await AuthRepository.me();
      setUserData(data);
      console.log('User data:', data);
      setCurrentToken(AuthRepository.getUser().access_token || null);

      setErrors(data); 

    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch user data';
      dispatch({ type: 'ADD_ERROR', payload: errorMessage }); // Agregar error al contexto
      console.error('Fetch user data error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthRepository.logout();
      console.log('User logged out');
      setCurrentToken(null);

    } catch (error) {
      const errorMessage = error.message || 'Logout failed because y';
      dispatch({ type: 'ADD_ERROR', payload: errorMessage }); // Agregar error al contexto
      console.error('Logout error:', error);
    }
  };

  const handleRefreshToken = async () => {
    try {
      const data = await AuthRepository.refresh();
      console.log('Refreshed token data:', data);
      setCurrentToken(AuthRepository.getUser().access_token || null);
      setErrors(data); 

    } catch (error) {
      const errorMessage = error.message || 'Failed to refresh token';
      dispatch({ type: 'ADD_ERROR', payload: errorMessage }); // Agregar error al contexto
      console.error('Refresh token error:', error);
    }
  };

  const handleOrders = async () => {
    try {
      const data = await MediaRepository.orders();
      console.log('Orders data:', data);
      setMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch orders';
      dispatch({ type: 'ADD_ERROR', payload: errorMessage }); // Agregar error al contexto
      console.error('Fetch orders error:', error);
    }
  }

  return (
    <>
      <div>
        <h2>Message from API:</h2>
        {userData && (
          <div>
            <h3>User Data:</h3>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}

        {/* Formulario de Login */}
        <div>
          <h3>Login</h3>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>

        {/* Formulario de Registro */}
        <div>
          <h3>Register</h3>
          <input
            type="text"
            placeholder="Name"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={registerPasswordConfirmation}
            onChange={(e) => setRegisterPasswordConfirmation(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
        </div>

        {/* Botones para otras funcionalidades */}
        <div>
          <button onClick={handleFetchUser}>Fetch User Data</button>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleRefreshToken}>Refresh Token</button>
        </div>

        {/* Mostrar el token actual */}
        <div>
          <h3>Current Token:</h3>
          <pre>{currentToken}</pre>
        </div>
      </div>

      <div>
          <h3>Errors:</h3>
          {state.errors.map((error, index) => (
            <div key={index} style={{ color: 'red' }}>
              {error}
              <button onClick={() => dispatch({ type: 'REMOVE_ERROR', payload: index })}>
                Dismiss
              </button>
            </div>
          ))}
        </div>
        <div>
          <h3>Orders:</h3>
          <button onClick={handleOrders}>Fetch Orders</button>
          <p>{message}</p>
        </div>
    </>
  );
}

export default App;
