import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, registration, logOut, refresh } from "../services/userService";
import jwtDecode from "jwt-decode";
import { HOME_ROUTE } from "../utils/constants";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/registration",
  async ({ userData, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await registration(userData);
      const user = jwtDecode(data.token);
      localStorage.setItem("user", JSON.stringify({ user, token: data.token }));
      dispatch(setUserCredentials({ user, token: data.token }));
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
      dispatch(setUserCredentials({ user, token: data.token }));
      navigate(HOME_ROUTE);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "user/refresh",
  async (navigate, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}api/user/refresh`,
        {
          withCredentials: true,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify({ user: data.user, token: data.token })
      );
      dispatch(setUserCredentials({ user: data.user, token: data.token }));
    } catch (error) {
      if (error.response.status == 401) {
        dispatch(logOutUser());
        navigate(HOME_ROUTE);
      }
      //
      //Navigate to loginFrom
      // return rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await logOut();
      localStorage.removeItem("user");
      dispatch(removeUserCredentials());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, token: null, isLoading: false },
  reducers: {
    setUserCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

    removeUserCredentials: (state, action) => {
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

export const { setUserCredentials, removeUserCredentials } = userSlice.actions;

export default userSlice.reducer;
