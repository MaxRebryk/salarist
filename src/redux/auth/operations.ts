import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setBaseUrl, setAuthToken, clearAuthToken } from "../baseUrl.ts";
import { User } from "./slice";

interface AuthResponse {
  data: object;
  accessToken: string | null;
}

setBaseUrl();

export const register = createAsyncThunk(
  "auth/register",
  async (newUser: User, thunkApi) => {
    try {
      const response = await axios.post<AuthResponse>(
        "/auth/register",
        newUser
      );
      const accessToken: string = response.data.data.accessToken;

      setAuthToken(accessToken);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: User, thunkApi) => {
    try {
      const response = await axios.post("/auth/login", user);

      const data = response.data.data;

      setAuthToken(data.accessToken);
      return {
        accessToken: data.accessToken,
        user: {
          userName: data.userName,
          userRole: data.userRole,
          userId: data.userId,
        },
      };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    const response = await axios.post("/auth/logout");
    clearAuthToken();
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    try {
      const response = await axios.post("/auth/refresh");
      const data = response.data.data;
      setAuthToken(data.accessToken);
      return {
        accessToken: data.accessToken,
        user: {
          userName: data.userName,
          userRole: data.userRole,
          userId: data.userId,
        },
      };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
