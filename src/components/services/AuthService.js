// services/authService.js
export const login = async (credentials) => {
    return fetch('https://task-manager-6tex.onrender.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
  };