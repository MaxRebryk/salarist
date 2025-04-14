import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { register, login, logout, refreshUser } from "./operations";

export interface User {
  userName: string | null;
  userId: string | null;
  userRole: string | null;
}

export interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  loading: boolean;
  error: boolean | unknown;
}

export interface AuthPayload {
  user: User;
  accessToken: string;
}

const initialState: AuthState = {
  user: {
    userName: null,
    userId: null,
    userRole: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: true,
  loading: false,
  error: false,
};

const handlePending = (state: AuthState) => {
  state.error = false;
  state.loading = true;
};

const handleRejected = (state: AuthState) => {
  state.loading = false;
  state.error = true;
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<AuthPayload>) => {
          state.error = false;
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.accessToken;
          state.isLoggedIn = true;
        }
      )
      .addCase(register.rejected, handleRejected)
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthPayload>) => {
        state.error = false;
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, handleRejected)
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
        state.user.userName = null;
        state.user.userId = null;
        state.user.userRole = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, handleRejected)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(
        refreshUser.fulfilled,
        (state, action: PayloadAction<AuthPayload>) => {
          state.user = action.payload.user;
          state.token = action.payload.accessToken;
          state.isRefreshing = false;
          state.isLoggedIn = true;
        }
      )
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.error = true;
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export default slice.reducer;
