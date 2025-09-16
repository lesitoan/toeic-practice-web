import axios from 'axios';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/common';
import { clientConfig } from '@/constants/env';

const isLogError = clientConfig.nodeEnv === 'development';

const axiosInstance = axios.create({
  baseURL: clientConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

class RequestHelpers {
  async get(baseUrl, url, params, enableErrorNoti = false, logError = isLogError, headers = {}) {
    try {
      const response = await axiosInstance.get(`${baseUrl}${url}`, {
        params,
        // paramsSerializer: (params) => parseParams(params),
        headers,
      });
      return response.data;
    } catch (error) {
      throw handleRequestError(error, enableErrorNoti, logError);
    }
  }

  async post(baseUrl, url, data = {}, options = {}, enableErrorNoti = false) {
    try {
      const response = await axiosInstance.post(`${baseUrl}${url}`, data, options);
      return response.data;
    } catch (error) {
      throw handleRequestError(error, enableErrorNoti);
    }
  }

  async put(baseUrl, url, data = {}, options = {}, enableErrorNoti = false) {
    try {
      const response = await axiosInstance.put(`${baseUrl}${url}`, data, options);
      return response.data;
    } catch (error) {
      throw handleRequestError(error, enableErrorNoti);
    }
  }

  async patch(baseUrl, url, data = {}, options = {}, enableErrorNoti = false) {
    try {
      const response = await axiosInstance.patch(`${baseUrl}${url}`, data, options);
      return response.data;
    } catch (error) {
      throw handleRequestError(error, enableErrorNoti);
    }
  }

  async delete(baseUrl, url, options = {}, enableErrorNoti = false) {
    try {
      const response = await axiosInstance.delete(`${baseUrl}${url}`, options);
      return response.data;
    } catch (error) {
      throw handleRequestError(error, enableErrorNoti);
    }
  }

  setAuthorizationToken(token) {
    axiosInstance.interceptors.request.use(function (config) {
      config.headers = {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : '',
      };
      return config;
    });
  }
}

const handleRequestError = (error, enableErrorNoti, logError) => {
  // if (logError) {
  //   console.error('Request error:', error);
  // }
  // let errors = {};
  // const status = error.response?.status || 0;
  // const data = error.response?.data || { message: DEFAULT_ERROR_MESSAGE };
  // if (logError) {
  //   console.error('Status:', status);
  //   console.error('Data:', data);
  //   console.error('Headers:', error?.response?.headers);
  // }
  // return errors;
};

export default new RequestHelpers();
