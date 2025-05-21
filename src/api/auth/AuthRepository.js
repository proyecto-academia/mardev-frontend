class AuthRepository {
  constructor() {
// this.baseUrl = 'https://mardev.es/api/auth';
// this.baseUrl = 'https://mardev.es/api/auth';
    this.baseUrl = "http://localhost"; // URL base de la API
    this.userKey = "user"; // Clave para almacenar el usuario
  }

  isBrowser() {
    return typeof window !== "undefined";
  }

  getAuthHeader() {
    const user = this.getUser();
    if (!user) return {};
    return {
      "Content-Type": "application/json",
      Authorization: `${user.token_type} ${user.access_token}`,
    };
  }

  // Guarda el usuario en localStorage
  saveUser(data) {
    if (this.isBrowser()) {
      localStorage.setItem(this.userKey, JSON.stringify(data));
    }
  }

  // Obtiene el usuario desde localStorage
  getUser() {
    if (this.isBrowser()) {
      const user = localStorage.getItem(this.userKey);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  getToken(){
    const user = this.getUser();
    if (user) {
      return user.access_token;
    }
    return null;
  }

  // Elimina el usuario de localStorage
  removeUser() {
    if (this.isBrowser()) {
      localStorage.removeItem(this.userKey);
    }
  }

  // Verifica si el token ha expirado
  isTokenExpired() {
    const user = this.getUser();
    if (!user || !user.expires_at) return true;
    return new Date(user.expires_at) < new Date();
  }

  // Verifica si hay un token válido almacenado
  hasToken() {
    return !!this.getUser().access_token;
  }

  // Realiza una petición de login
  async login(email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseContent = await response.json();
      // Accede a la propiedad 'data' del objeto JSON
      if (responseContent.data) {
        this.saveUser(responseContent.data); // Guarda el nuevo token
          
      }
      return responseContent;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  // Realiza una petición de registro
  async register(name, email, password, passwordConfirmation) {
    try {
      const response = await fetch(`${this.baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const responseContent = await response.json();
      // Accede a la propiedad 'data' del objeto JSON
      if (responseContent.data?.access_token) {
        this.saveUser({
          access_token: responseContent.data.access_token,
          expires_at: responseContent.data.expires_at,
          token_type: responseContent.data.token_type,
          user: responseContent.data.user,
        }); // Guarda el nuevo token
      }
      return responseContent;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  }

  // Realiza una petición para obtener los datos del usuario autenticado
  async me() {
    try {
      const user = this.getUser();
      if (!user) throw new Error("No token available");

      const response = await fetch(`${this.baseUrl}/me`, {
        method: "GET",
        headers: this.getAuthHeader(),
      });

      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  // Realiza una petición para cerrar sesión
  async logout() {
    try {
      const user = this.getUser();
      if (!user) throw new Error("No token available");

      const response = await fetch(`${this.baseUrl}/logout`, {
        method: "POST",
        headers: this.getAuthHeader(),
      });

      this.removeUser(); // Elimina el usuario
      return await response.json();
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  }

  // Realiza una petición para refrescar el token
  async refresh() {
    try {
      const user = this.getUser();
      if (!user) throw new Error("No token available");

      const response = await fetch(`${this.baseUrl}/refresh`, {
        method: "POST",
        headers: this.getAuthHeader(),
      });

      const responseContent = await response.json();
      if (responseContent.data?.access_token) {
        this.saveUser({
          access_token: responseContent.data.access_token,
          expires_at: responseContent.data.expires_at,
          token_type: responseContent.data.token_type,
          user: responseContent.data.user,
        });
      }

      return responseContent;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  }
}

export default new AuthRepository();
