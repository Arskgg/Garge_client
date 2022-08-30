import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, registration, logOut } from "../services/userService";
import jwtDecode from "jwt-decode";
import { HOME_ROUTE } from "../utils/constants";

export const registerUser = createAsyncThunk(
  "user/registration",
  async ({ userData, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await registration(userData);
      const user = jwtDecode(data.token);
      localStorage.setItem("user", JSON.stringify({ user, token: data.token }));
      dispatch(setCredentials({ user, token: data.token }));
      navigate(HOME_ROUTE);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ userData, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await login(userData);
      const user = jwtDecode(data.token);
      localStorage.setItem("user", JSON.stringify({ user, token: data.token }));
      dispatch(setCredentials({ user, token: data.token }));
      navigate(HOME_ROUTE);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await logOut();
      localStorage.removeItem("user");
      dispatch(removeCredentials());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, token: null, isLoading: false },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

    removeCredentials: (state, action) => {
      state = { user: null, token: null, isLoading: false };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {});
  },
});

export const selectCurrentToken = (state) => state.user.token;

export const { setCredentials, removeCredentials } = userSlice.actions;

export default userSlice.reducer;
