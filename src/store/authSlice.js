import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      const user = jwtDecode(token);
      state.user = user;
      state.token = token;
      localStorage.setItem("user", JSON.stringify({ token }));
    },
    logOut: (state, action) => {
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
