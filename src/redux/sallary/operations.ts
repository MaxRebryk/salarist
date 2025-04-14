import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setBaseUrl, setAuthToken } from "../baseUrl.ts";
import { selectToken, selectUser } from "../auth/selectors.ts";
import { selectWorker } from "./selectors.ts";
import { Worker } from "./slice";
import { RootState } from "../store";

export interface WorkersData {
  users: Worker[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface WorkersResponse {
  data: WorkersData;
}

export interface WorkerResponse {
  data: Worker;
}

export interface SallaryResponse {
  data: {
    sallary: number;
  };
}

setBaseUrl();

export const getAll = createAsyncThunk<
  WorkersResponse,
  void,
  { state: RootState }
>("users/getAll", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const authToken = selectToken(state);
    if (!authToken) throw new Error("No auth token");
    setAuthToken(authToken);
    const response = await axios.get<WorkersResponse>("/users/");
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const getOne = createAsyncThunk<
  WorkerResponse,
  void,
  { state: RootState }
>("users/getOne", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const workerId = selectUser(state).userId;
    if (!workerId) throw new Error("No worker ID");
    const response = await axios.get<WorkerResponse>(`/users/${workerId}`);
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const addSallary = createAsyncThunk<
  SallaryResponse,
  number,
  { state: RootState }
>("users/addSallary", async (adedSallary, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const worker = selectWorker(state);
    if (!worker) throw new Error("No worker selected");

    const response = await axios.patch<SallaryResponse>(
      `/users/${worker._id}`,
      { sallary: worker.sallary + adedSallary },
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
});
