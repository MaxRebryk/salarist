import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addSallary, getAll, getOne } from "./operations";

export interface Worker {
  _id: string;
  name: string;
  phoneNumber: string;
  sallary: number;
  fine: number;
  workDays: number;
  userType: string;
  parentId: string;
}

export interface SallaryState {
  workers: Worker[];
  worker: Worker | null;
  loading: boolean;
  error: boolean;
}

const initialState: SallaryState = {
  workers: [],
  worker: null,
  loading: false,
  error: false,
};

const handlePending = (state: SallaryState) => {
  state.error = false;
  state.loading = true;
};

const handleRejected = (state: SallaryState) => {
  state.loading = false;
  state.error = true;
};

const slice = createSlice({
  name: "sallary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, handlePending)
      .addCase(getAll.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.workers = action.payload.data.data;
      })
      .addCase(getAll.rejected, handleRejected)
      .addCase(getOne.rejected, handleRejected)
      .addCase(getOne.pending, handlePending)
      .addCase(getOne.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.worker = action.payload.data;
      })
      .addCase(addSallary.pending, handlePending)
      .addCase(addSallary.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        if (state.worker) {
          state.worker.sallary = action.payload.data.sallary;
        }
      })
      .addCase(addSallary.rejected, handleRejected);
  },
});
export default slice.reducer;
