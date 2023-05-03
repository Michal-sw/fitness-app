import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { LoginDT } from "../types/LoginDT";
import { UserDT } from "../types/UserDT";
import axiosService from "../../services/axiosService";
import useNotifications from "../../hooks/useNotifications";

interface AuthContextType {
  user: UserDT;
  token: string;
  refreshToken?: string;
  authenticated?: boolean;
  error?: any;
  login: (values: LoginDT) => void;
  signIn: (values: LoginDT) => void;
  logout: () => void;
}

const initUser: UserDT = {
  _id: "",
  firstName: "",
  lastName: "",
  password: "",
  login: "",
  email: "",
  refreshToken: "",
  activities: [],
  registrationDate: new Date(),
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState<UserDT>(initUser);
  const [token, setToken] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>();
  const [error, setError] = useState<any>();
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { actions } = useNotifications();

  useEffect(() => {
    if (error) setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(
      () =>
        axiosService
          .refreshToken()
          .then((res) => setAuthData(res.data))
          .catch((err) => setError(err)),
      60000
    );
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    axiosService
      .refreshToken()
      .then((res) => {
        setAuthData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingInitial(false);
      });
  }, []);

  // function handleError(err: AxiosError) {
  //   actions.addNotification(err.message);
  //   setError(err);
  // }

  function handleInvalidLogin() {
    actions.addErrorNotification("Invalid email or password");
  }

  function setAuthData({ token, user }: { token: string; user: UserDT }) {
    setToken(token || "");
    setUser(user);
    if (token) setAuthenticated(true);
  }

  function login(values: LoginDT) {
    axiosService
      .login(values)
      .then((res) => {
        if (res.status === 200 && res.data.token) {
          setAuthData(res.data);
          navigate("/dashboard");
        }
      })
      .catch(() => {
        handleInvalidLogin();
      });
  }

  function signIn(values: LoginDT) {
    axiosService
      .signIn(values)
      .then((res) => {
        if (res.status === 200 && res.data.token) {
          setAuthData(res.data);
          navigate("/dashboard");
        }
      })
      .catch(() => {
        handleInvalidLogin();
      });
  }

  function logout() {
    setToken("");
    setAuthenticated(false);
    axiosService.logout();
    navigate("/");
  }

  const memoedValue = useMemo(
    () => ({
      error,
      user,
      token,
      authenticated,
      login,
      signIn,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [error, token, authenticated]
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
