import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken); // Guardar el token en el almacenamiento local
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  const loadTokenFromStorage = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loadTokenFromStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);