import axios, { Axios, AxiosResponse } from "axios";
import { LoginDT } from "../core/types/LoginDT";
import { SurveyDT } from "../core/types/SurrveryDT";
import { ActivityDT } from "../core/types/ActivityDT";

const apiPath = process.env.REACT_APP_API_PATH || "127.0.0.1:8080";
// const chatbotPath = process.env.REACT_APP_CHATBOT_API_PATH || "127.0.0.1:5000";

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const getSurveys = async (token: string, id: string) => {
  return axiosInstance.get(`http://${apiPath}/surveys/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const startSurvey = async (token: string, id: string) => {
  return axiosInstance.post(`http://${apiPath}/surveys`, { id: id }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const finishSurvey = async (token: string, id: string, values: SurveyDT) => {
  return axiosInstance.patch(`http://${apiPath}/surveys`, { id: id, ...values }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const getActivities = async (token: string) => {
  return axiosInstance.get(`http://${apiPath}/activities/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const getUserActivities = async (token: string, id: string) => {
  return axiosInstance.get(`http://${apiPath}/users/${id}/activities/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
} 

const addActivity = async (token: string, id: string, values: ActivityDT) => {
  return axiosInstance.post(`http://${apiPath}/activities`, { id, ...values }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

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
};

interface AxiosService {
  axiosInstance: Axios,
  getSurveys: (token: string, id: string) => Promise<AxiosResponse>,
  startSurvey: (token: string, id: string) => Promise<AxiosResponse>,
  finishSurvey: (token: string, id: string, values: SurveyDT) => Promise<AxiosResponse>,
  getActivities: (token: string) => Promise<AxiosResponse>,
  getUserActivities: (token: string, id: string) => Promise<AxiosResponse>,
  addActivity: (token: string, id: string, values: ActivityDT) => Promise<AxiosResponse>,
  refreshToken: () => Promise<AxiosResponse>,
  login: (values: LoginDT) => Promise<AxiosResponse>,
  signIn: (values: LoginDT) => Promise<AxiosResponse>,
  logout: () => Promise<AxiosResponse>,
};

const axiosService: AxiosService = {
  axiosInstance,
  getSurveys,
  startSurvey,
  finishSurvey,
  refreshToken,
  addActivity,
  getActivities,
  getUserActivities,
  login,
  signIn,
  logout,
};

export default axiosService;