import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast'; 

axios.defaults.baseURL = 'https://connections-api.goit.global/';

const setAuthHeader = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common['Authorization'] = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', userData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuthHeader(token);
      return response.data;
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'This email is already registered');
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      toast.error('An error occurred during registration');
      return thunkAPI.rejectWithValue('An error occurred during registration');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', userData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuthHeader(token);
      return response.data;
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'email or password is incorrect');
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      toast.error('An error occurred during login');
      return thunkAPI.rejectWithValue('An error occurred during login');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    localStorage.removeItem('token');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    setAuthHeader(token);

    try {
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
