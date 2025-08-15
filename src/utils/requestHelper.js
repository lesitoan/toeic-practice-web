import axios from 'axios';
import { toast } from 'react-toastify';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/common';

const baseApiUrl = process.env.NEXT_PUBLIC_API;

const axiosInstance = axios.create({
  baseURL: baseApiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

class RequestHelpers {
  get = async (baseUrl, url, params, enableErrorNoti = false, logError = true, headers = {}) => {
    try {
      const response = await axiosInstance.get(`${baseUrl}${url}`, {
        params,
        paramsSerializer: (params) => parseParams(params),
        headers,
      });
      return response.data;
    } catch (error) {
      throw handleRequestError(error, enableErrorNoti, logError);
    }
  };

  post = async (baseUrl, url, data = {}, options = {}, enableErrorNoti = false) => {
    try {
      const response = await axiosInstance.post(`${baseUrl}${url}`, data, options);
      return response.data;
    } catch (error) {
      throw handleRequestError(error, enableErrorNoti);
    }
  };

  put = async (baseUrl, url, data = {}, options = {}, enableErrorNoti = false) => {
    try {
      const response = await axiosInstance.put(`${baseUrl}${url}`, data, options);
      return response.data;
    } catch (error) {
      throw handleRequestError(error, enableErrorNoti);
    }
  };

  patch = async (baseUrl, url, data = {}, options = {}, enableErrorNoti = false) => {
    try {
      const response = await axiosInstance.patch(`${baseUrl}${url}`, data, options);
      return response.data;
    } catch (error) {
      throw handleRequestError(error, enableErrorNoti);
    }
  };

  delete = async (baseUrl, url, options = {}, enableErrorNoti = false) => {
    try {
      const response = await axiosInstance.delete(`${baseUrl}${url}`, options);
      return response.data;
    } catch (error) {
      throw handleRequestError(error, enableErrorNoti);
    }
  };

  setAuthorizationToken = (token) => {
    axiosInstance.interceptors.request.use(function (config) {
      config.headers = {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : '',
      };
      return config;
    });
  };
}

const handleRequestError = (error, enableErrorNoti, logError) => {
  if (logError) {
    console.error('Request error:', error);
  }
  let errors = {};
  errors.status = error.response.status;
  errors.data = error.response.data;

  if (logError) {
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
    console.error('Headers:', error.response.headers);
  }
  if (error.request) {
    console.error('No response received:', error.request);
  }
  return errors;
};

export default new RequestHelpers();
