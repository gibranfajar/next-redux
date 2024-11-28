import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const memberID = localStorage.getItem("memberID");
      if (!memberID) {
        return rejectWithValue("Member ID tidak ditemukan");
      }

      const params = new URLSearchParams({ memberID }).toString();
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}dashboard/info?${params}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Terjadi kesalahan");
    }
  }
);
