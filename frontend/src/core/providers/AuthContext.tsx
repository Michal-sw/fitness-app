import axios from "axios";
import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import useCookies from "../../hooks/useCookies";
import { LoginDT } from "../types/LoginDT";

interface AuthContextType {
  username?: String;
  token?: String;
  authenticated?: boolean;
  error?: any;
  login: (values: LoginDT) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: {children: ReactElement }) {
  const { getCookie, setCookie } = useCookies();
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
    const token = getCookie("jwtToken");
    setUsername(token || "");
    setToken(token || "");
    if (token) setAuthenticated(true);
    setLoadingInitial(false);
  }, []);
  
  function login(values: LoginDT) {
    const apiPath = process.env.REACT_APP_API_PATH || "127.0.0.1:8080";
    axios
      .post(`http://${apiPath}/users/auth`, values )
      .then(res => {
        if (res.status === 200 && res.data.token) {
          const token = res.data.token;
          setCookie("jwtToken", token, 1);
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
    setCookie("jwtToken", "");
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
