import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { LoginDT } from "../core/types/LoginDT";

const apiPath = process.env.REACT_APP_API_PATH || "127.0.0.1:8080";

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(undefined, async (err: AxiosError) => {
  // if (err.response?.status === 401) {
  //   console.log("Unauthorized");
  //   return refreshToken()
  //     .then(() => err.config ? axios.request(err.config) : null);
  // }
  return Promise.reject(err);
});

const refreshToken = async () => {
  return axiosInstance.post(`http://${apiPath}/users/refresh`);
};

const login = async (values: LoginDT) => {
  return axiosInstance.post(`http://${apiPath}/users/login`, values);
};

interface AxiosService {
  axiosInstance: Axios,
  refreshToken: () => Promise<AxiosResponse>,
  login: (values: LoginDT) => Promise<AxiosResponse>
};

const axiosService: AxiosService = {
  axiosInstance,
  refreshToken,
  login,
};

export default axiosService;