import axios from 'axios';

import { useState, useEffect } from 'react';
import useAuth from '../core/providers/AuthContext';

export const useAxios = () => {
  const { authenticated, token } = useAuth();
  const [axiosInstance, setAxiosInstance] = useState({});

  useEffect(() => {
    const instance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: authenticated ? `Bearer ${token}` : '',
      },
    });
    setAxiosInstance({instance});

  }, [token, authenticated]);

  return { axios: axiosInstance };
};

export default useAxios;