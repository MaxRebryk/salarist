import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setBaseUrl, setAuthToken, clearAuthToken } from "../baseUrl.ts";
import { AuthPayload, User } from "./slice";

interface AuthResponse {
  data: {
    accessToken: string;
    userName?: string;
    userRole?: string;
    userId?: string;
  };
}

interface AuthData {
  accessToken: string;
  userName?: string;
  userRole?: string;
  userId?: string;
}

interface ThunkApi {
  rejectWithValue: (value: string) => unknown;
}

setBaseUrl();

export const register = createAsyncThunk<AuthPayload, User>(
  "auth/register",
  async (newUser, thunkApi) => {
    try {
      const response = await axios.post<AuthResponse>(
        "/auth/register",
        newUser
      );
      const accessToken = response.data.data.accessToken;

      setAuthToken(accessToken);

      return {
        accessToken,
        user: {
          userName: response.data.data.userName || "",
          userRole: response.data.data.userRole || "",
          userId: response.data.data.userId || "",
        },
      };
    } catch (error) {
      const err = error as Error;
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk<AuthPayload, User>(
  "auth/login",
  async (user: User, thunkApi: ThunkApi): Promise<AuthPayload> => {
    try {
      const response = await axios.post<AuthResponse>("/auth/login", user);

      const data: AuthData = response.data.data;

      setAuthToken(data.accessToken);

      return {
        accessToken: data.accessToken,
        user: {
          userName: data.userName || null,
          userRole: data.userRole || null,
          userId: data.userId || null,
        },
      };
    } catch (error) {
      const err = error as Error;
      return thunkApi.rejectWithValue(err.message) as unknown as AuthPayload;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    const response = await axios.post("/auth/logout");
    clearAuthToken();
    return response.data;
  } catch (error) {
    const err = error as Error;
    return thunkApi.rejectWithValue(err.message);
  }
});

export const refreshUser = createAsyncThunk<AuthPayload, void>(
  "auth/refresh",
  async (_, thunkApi: ThunkApi): Promise<AuthPayload> => {
    try {
      const response = await axios.post<AuthResponse>("/auth/refresh");
      const data = response.data.data;

      setAuthToken(data.accessToken);

      return {
        accessToken: data.accessToken,
        user: {
          userName: data.userName || null,
          userRole: data.userRole || null,
          userId: data.userId || null,
        },
      };
    } catch (error) {
      const err = error as Error;
      return thunkApi.rejectWithValue(err.message) as unknown as AuthPayload;
    }
  }
);
