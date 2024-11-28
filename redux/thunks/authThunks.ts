import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { user: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'dashboard/login', credentials, {headers: {'Content-Type': 'multipart/form-data'}});
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Terjadi kesalahan');
    }
  }
);
