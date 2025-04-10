import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setBaseUrl, setAuthToken } from "../baseUrl.ts";
import { selectToken, selectUser } from "../auth/selectors.ts";
import { thunk } from "redux-thunk";
import { selectWorker } from "./selectors.ts";

interface AuthResponse {
  data: object;
  accessToken: string | null;
}

setBaseUrl();

export const getAll = createAsyncThunk("users/getAll", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const authToken = selectToken(state);
    setAuthToken(authToken);
    const response = await axios.get<AuthResponse>("/users/");
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const getOne = createAsyncThunk("users/getOne", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const workerId = selectUser(state).userId;
    const response = await axios.get<AuthResponse>(`/users/${workerId}`);
    return response.data;
  } catch {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const addSallary = createAsyncThunk(
  "users/addSallary",
  async (adedSallary, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const workerId = selectWorker(state)?._id;
      const finalSallary = selectWorker(state)?.sallary + adedSallary;

      const response = await axios.patch<AuthResponse>(
        `/users/${workerId}`,
        { sallary: finalSallary },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
