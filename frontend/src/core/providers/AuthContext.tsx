import React, { createContext, ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoginDT } from "../types/LoginDT";
import axiosService from "../../services/axiosService";

interface AuthContextType {
  username?: String;
  token?: String;
  refreshToken?: String;
  authenticated?: boolean;
  error?: any;
  login: (values: LoginDT) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: {children: ReactElement }) {
  const [username, setUsername] = useState<String>();
  const [token, setToken] = useState<String>();
  const [authenticated, setAuthenticated] = useState<boolean>();
  const [error, setError] = useState<any>();
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    axiosService.refreshToken()
      .then(res => {
        console.log(res.data);
        console.log(res.status);
        const token = res.data.token;
        setUsername(token || "");
        setToken(token || "");
        if (token) setAuthenticated(true);
      })
      .catch(err => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoadingInitial(false);
      })
  }, []);

  function login(values: LoginDT) {
    axiosService.login(values)
      .then(res => {
        if (res.status === 200 && res.data.token) {
          console.log(res.data);
          const token = res.data.token;
          setAuthenticated(true);
          setToken(token);
        }
      })
      .catch(err => {
        console.log(err);
        setError(err);
      })
  }

  function logout() {
    setToken("");
    setAuthenticated(false);
  }

  const memoedValue = useMemo(
    () => ({
      username,
      error,
      token,
      authenticated,
      login,
      logout,
    }),
    [username, error, token]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
