import axios from "axios";
import { useEffect, useState } from "react";
import useCookies from "./useCookies";

const useAuth = () => {
  const apiPath = process.env.REACT_APP_API_PATH || "127.0.0.1:8080";

  const { getCookie, setCookie } = useCookies();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie("jwtToken");
    if (token?.length) {
      setIsAuthenticated(true);
    }
  }, [])

  // Data should be sent through HTTPS to prevent sniffing
  const login = (login: String, password: String) => {
    if (isAuthenticated) return;

    axios.post(`${apiPath}/users/auth`, { login, password })
      .then(res => {
        if (res.status === 200) {
          const token = res.data;
          setCookie("jwtToken", token, 1);
          setIsAuthenticated(token);
        }
      })
      .catch(err => {

      })
  }

  const logout = () => {
    setCookie("jwtToken", "");
  }

  return {
    isAuthenticated,
    login,
    logout
  }
}

export default useAuth;