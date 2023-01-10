import { createContext, ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoginDT } from "../types/LoginDT";
import axiosService from "../../services/axiosService";
import { AxiosError } from "axios";

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

  axiosService
    .axiosInstance
    .interceptors
    .response
    .use(undefined, async (err: AxiosError | any) => {
      if (err.response?.status === 401 && !err.config.__isRetryConfig) {
        console.log("Refresh token expired, refreshing and retrying...");
        axiosService.refreshToken()
          .then(res => {
            err.config.__isRetryConfig = true;
            const newToken = res.data.token;
            setToken(newToken || "");
            if (newToken) setAuthenticated(true);
            else setAuthenticated(false);
          })
          .catch(err => console.log(err));
      }
      return Promise.reject(err);
    });

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);
  
  useEffect(() => {
    axiosService.refreshToken()
      .then(res => {
        const token = res.data.token;
        setUsername(token || "");
        setToken(token || "");
        if (token) setAuthenticated(true);
      })
      .catch(err => {
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
          const token = res.data.token;
          setAuthenticated(true);
          setToken(token);
        }
      })
      .catch(err => {
        setError(err);
      })
  }

  function logout() {
    setToken("");
    setAuthenticated(false);
    axiosService.logout();
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
    [username, error, token, authenticated]
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
