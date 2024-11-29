import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const member = localStorage.getItem("member");
      if (!member) {
        return rejectWithValue("Member ID tidak ditemukan");
      }
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}dashboard/info?memberID=${member}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Terjadi kesalahan");
    }
  }
);
