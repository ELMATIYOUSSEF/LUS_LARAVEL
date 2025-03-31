import axios from 'axios';

// Créer une instance axios avec l'URL de base de notre API Laravel
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default api;