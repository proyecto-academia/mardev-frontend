class AuthRepository {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost/api/auth';
    this.userKey = 'user';
  }

  isBrowser() {
    return typeof window !== 'undefined';
  }

  saveUser(data) {
    if (this.isBrowser()) {
      localStorage.setItem(this.userKey, JSON.stringify(data));
    }
  }

  getUser() {
    if (this.isBrowser()) {
      const user = localStorage.getItem(this.userKey);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  getToken() {
    return this.getUser()?.access_token || null;
  }

  removeUser() {
    if (this.isBrowser()) {
      localStorage.removeItem(this.userKey);
    }
  }

  getAuthHeader() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  hasToken() {
    return !!this.getToken();
  }

  async login(email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.data) this.saveUser(data.data);
      return data;
    } catch (error) {
      console.error('[LOGIN ERROR]', error);
      throw error;
    }
  }

  async register(name, email, password, passwordConfirmation) {
    try {
      const response = await fetch(`${this.baseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();
      if (data.data?.access_token) this.saveUser(data.data);
      return data;
    } catch (error) {
      console.error('[REGISTER ERROR]', error);
      throw error;
    }
  }

  async me() {
    try {
      const response = await fetch(`${this.baseUrl}/me`, {
        method: 'GET',
        headers: this.getAuthHeader(),
      });

      return await response.json();
    } catch (error) {
      console.error('[ME ERROR]', error);
      throw error;
    }
  }

  async logout() {
    try {
      const response = await fetch(`${this.baseUrl}/logout`, {
        method: 'POST',
        headers: this.getAuthHeader(),
      });

      this.removeUser();
      return await response.json();
    } catch (error) {
      console.error('[LOGOUT ERROR]', error);
      throw error;
    }
  }

  async refresh() {
    try {
      const response = await fetch(`${this.baseUrl}/refresh`, {
        method: 'POST',
        headers: this.getAuthHeader(),
      });

      const data = await response.json();
      if (data.data?.access_token) this.saveUser(data.data);
      return data;
    } catch (error) {
      console.error('[REFRESH ERROR]', error);
      throw error;
    }
  }
}

export default new AuthRepository();
