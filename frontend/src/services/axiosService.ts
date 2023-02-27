import axios, { Axios, AxiosResponse } from "axios";
import { LoginDT } from "../core/types/LoginDT";
import { SurveyDT } from "../core/types/SurrveryDT";
import { ActivityDT } from "../core/types/ActivityDT";
import { UserDT } from "../core/types/UserDT";

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

const updateUser = async (token: string, userId: string, values: UserDT) => {
  return axiosInstance.patch(`http://${apiPath}/users/${userId}`, { ...values }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
  });
}

const getUser = async (token: string, userId: string) => {
  return axiosInstance.get(`http://${apiPath}/users/${userId}`, {
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

const markActivityAsSkipped = async (token: string, userId:string, values: ActivityDT) => {
  return Promise.all([
    updateActivity(token, values),
    updateUserActivity(token, userId, values, true)
  ]);
};

const markActivityAsPerformed = async (token: string, userId:string, values: ActivityDT) => {
  return Promise.all([
    updateActivity(token, values),
    updateUserActivity(token, userId, values, false)
  ]);
};

const updateUserActivity = async (token: string, userId: string, values: ActivityDT, skipped: boolean) => {
  return axiosInstance.patch(`http://${apiPath}/users/${userId}/activities`, { activityId: values._id, skipped },{
      headers: {
        Authorization: `Bearer ${token}`
      }
  });
}

const updateActivity = async (token: string, values: ActivityDT) => {
  return axiosInstance.patch(`http://${apiPath}/activities`, values, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const addUserToActivity = async (token: string, userId: string, activityId: string) => {
  return axiosInstance.post(`http://${apiPath}/users/${userId}/activities`, { activityId } ,{
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
  markActivityAsSkipped: (token:string, userId: string, values: ActivityDT) => Promise<AxiosResponse[]>, 
  markActivityAsPerformed: (token:string, userId: string, values: ActivityDT) => Promise<AxiosResponse[]>, 
  getUserActivities: (token: string, id: string) => Promise<AxiosResponse>,
  updateUser: (token: string, id: string, values: any) => Promise<AxiosResponse>,
  getUser: (token: string, id: string) => Promise<AxiosResponse>,
  updateActivity: (token:string, values: ActivityDT) => Promise<AxiosResponse>, 
  addActivity: (token: string, id: string, values: ActivityDT) => Promise<AxiosResponse>,
  addUserToActivity: (token: string, userId: string, activityId: string) => Promise<AxiosResponse>,
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
  updateUser,
  getUser,
  addActivity,
  getActivities,
  updateActivity,
  markActivityAsSkipped,
  markActivityAsPerformed,
  addUserToActivity,
  getUserActivities,
  login,
  signIn,
  logout,
};

export default axiosService;