import axios, { Axios, AxiosResponse } from "axios";
import { LoginDT } from "../core/types/LoginDT";

const apiPath = process.env.REACT_APP_API_PATH || "127.0.0.1:8080";
const chatbotPath = process.env.REACT_APP_CHATBOT_API_PATH || "127.0.0.1:5000";

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const refreshToken = async () => {
  return axiosInstance.post(`http://${apiPath}/users/refresh`);
};

const login = async (values: LoginDT) => {
  return axiosInstance.post(`http://${apiPath}/users/login`, values);
};

const signIn = async (values: LoginDT) => {
  return axiosInstance.post(`http://${apiPath}/users/signin`, values);
};

const logout = async () => {
  return axiosInstance.get(`http://${apiPath}/users/logout`);
}

interface AxiosService {
  axiosInstance: Axios,
  refreshToken: () => Promise<AxiosResponse>,
  login: (values: LoginDT) => Promise<AxiosResponse>,
  signIn: (values: LoginDT) => Promise<AxiosResponse>,
  logout: () => Promise<AxiosResponse>,
};

const axiosService: AxiosService = {
  axiosInstance,
  refreshToken,
  login,
  signIn,
  logout,
};

export default axiosService;