import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPromo = createAsyncThunk(
  "promo/getPromo",
  async (_, { rejectWithValue }) => {
    try {
      const member = localStorage.getItem("member");
      if (!member) {
        return rejectWithValue("Member ID tidak ditemukan");
      }
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}promo/list?memberID=${member}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Terjadi kesalahan");
    }
  }
);
