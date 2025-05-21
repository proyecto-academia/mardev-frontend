import AuthRepository from "../auth/AuthRepository";

class MediaRepository {
    constructor() {
    //   this.baseUrl = 'https://mardev.es/api/media';
    
      this.baseUrl = "http://localhost"; // URL base de la API
      this.userKey = "user"; // Clave para almacenar el token
      // this.baseUrl = "https://api.example.com"; // Cambia esto por la URL base de tu API
      const token = this.authRepository.getUser().access_token;
      console.log("Token:", token);
      this.token = token ? token : null;
      if(!this.token) {
        this.token = null;
      }
    }


    async orders() {
        console.log( this.authRepository.getToken());
        if (!this.authRepository.hasToken()) {
            throw new Error("No token found");
        }
        try {
            const response = await fetch(`${this.baseUrl}/orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.authRepository.getToken()}`,
                },
            });

            if (!response.ok && response.status === 401) {
                throw new Error("Invalid token");
            }

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    }

}
export default new MediaRepository();