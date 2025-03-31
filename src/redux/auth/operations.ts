import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setBaseUrl, setAuthToken, clearAuthToken } from "../baseUrl.ts";
import { User } from "./slice";
import { RootState } from "../store";

interface AuthResponse {
  data: object;
  accessToken: string;
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
      setAuthToken(response.data.token);
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

      const accessToken = response.data.data.accessToken;

      setAuthToken(accessToken);
      return {
        accessToken,
        user: {
          name: null,
          email: user.email,
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
      const reduxState = thunkApi.getState() as RootState;
      setAuthToken(reduxState.auth.token);
      const response = await axios.get("/auth/refresh");
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition(_, thunkApi) {
      const reduxState = thunkApi.getState() as RootState;
      return reduxState.auth.token != null;
    },
  }
);
