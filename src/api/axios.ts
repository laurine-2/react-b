import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Remplacez par l'URL de votre API
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Ajoutez un token d'authentification si nécessaire
    const token = localStorage.getItem('token'); // Ou utilisez votre méthode de gestion de token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gérez les erreurs de réponse ici, par exemple une redirection en cas de 401
    if (error.response.status === 401) {
      // Redirection ou déconnexion
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
