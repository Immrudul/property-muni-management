import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      //  Clear old token before attempting login
      setToken(null);
      localStorage.removeItem("token");

      const response = await axios.post("http://127.0.0.1:8000/api/token/", { username, password });

      if (response.status === 200) {
        const accessToken = response.data.access;
        setToken(accessToken);
        localStorage.setItem("token", accessToken);
        return true;  // Successful login
      } else {
        return false; // Login failed
      }
    } catch (error) {
      console.error("Login failed", error);
      return false; // Login failed
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
