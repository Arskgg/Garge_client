import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
import authReducer from "./authSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
