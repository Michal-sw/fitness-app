import { createContext, ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginDT } from "../types/LoginDT";
import axiosService from "../../services/axiosService";
import { AxiosError } from "axios";
import useNotifications from "../../hooks/useNotifications";

interface AuthContextType {
  username?: String;
  token?: String;
  refreshToken?: String;
  authenticated?: boolean;
  error?: any;
  login: (values: LoginDT) => void;
  signIn: (values: LoginDT) => void;
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
  const navigate = useNavigate();
  const { actions } = useNotifications();

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

  function handleError(err: AxiosError) {
    console.log(err);
    actions.sendDissapearingNotification({ message: err.message });
    setError(err);
  }

  function login(values: LoginDT) {
    axiosService.login(values)
      .then(res => {
        if (res.status === 200 && res.data.token) {
          const token = res.data.token;
          setAuthenticated(true);
          setToken(token);
          navigate('/');
        }
      })
      .catch(err => {
        handleError(err);
      })
  }

  function signIn(values: LoginDT) {
    axiosService.signIn(values)
      .then(res => {
        if (res.status === 200 && res.data.token) {
          const token = res.data.token;
          setAuthenticated(true);
          setToken(token);
          navigate('/');
        }
      })
      .catch(err => {
        handleError(err);
      })
  }

  function logout() {
    setToken("");
    setAuthenticated(false);
    axiosService.logout();
    navigate('/');
  }

  const memoedValue = useMemo(
    () => ({
      username,
      error,
      token,
      authenticated,
      login,
      signIn,
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
