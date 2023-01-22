import axios, { Axios, AxiosResponse } from "axios";
import { LoginDT } from "../core/types/LoginDT";
import { SurveyDT } from "../core/types/SurrveryDT";

const apiPath = process.env.REACT_APP_API_PATH || "127.0.0.1:8080";
const chatbotPath = process.env.REACT_APP_CHATBOT_API_PATH || "127.0.0.1:5000";

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const getCompletedSurveys = async (token: string, id: string) => {
  return axiosInstance.get(`http://${apiPath}/users/${id}/surveys`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

const sendSurvey = async (token: string, id: string, values: SurveyDT) => {
  return axiosInstance.post(`http://${apiPath}/users/${id}/surveys`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

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
  getCompletedSurveys: (token: string, id: string) => Promise<AxiosResponse>,
  sendSurvey: (token: string, id: string, values: SurveyDT) => Promise<AxiosResponse>,
  refreshToken: () => Promise<AxiosResponse>,
  login: (values: LoginDT) => Promise<AxiosResponse>,
  signIn: (values: LoginDT) => Promise<AxiosResponse>,
  logout: () => Promise<AxiosResponse>,
};

const axiosService: AxiosService = {
  axiosInstance,
  getCompletedSurveys,
  sendSurvey,
  refreshToken,
  login,
  signIn,
  logout,
};

export default axiosService;