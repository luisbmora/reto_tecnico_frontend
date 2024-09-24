// src/services/authService.js
import config from '../config';
const API_URL = `${config.API_URL}/users/login`;



// Simula un retraso de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fakeUsers = [
  { email: 'user@example.com', password: 'password123' },
  { email: 'admin@example.com', password: 'admin123' },
];

export const login = async (email, password) => {
  try {
      let credentials= {
        email: email,
        password: password
      }
      console.log(API_URL, 'hdhddh')
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        console.log(data.token)
        localStorage.setItem('token', data.token);
        return data; // Aquí puedes manejar el token o cualquier otro dato que devuelva tu API
    } catch (error) {
        console.error('Error during login:', error);
        throw error; // Puedes lanzar el error para manejarlo en el componente
    }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = token.split('.')[1]; // Obtener la parte del payload

      // Convertir Base64Url a Base64
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(base64)); // Decodificar el payload

      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
      if (decoded.exp && decoded.exp < currentTime) {
        // Si el token ha expirado, eliminarlo
        localStorage.removeItem('token');
        return null; // Token expirado
      }

      return { userId: decoded.sub }; // Retornar el ID del usuario
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; // En caso de error, retornar null
    }
  }
  return null; // No hay token
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};