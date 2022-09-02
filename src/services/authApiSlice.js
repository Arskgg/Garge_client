import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (userData) => ({
        url: "/api/user/login",
        method: "POST",
        body: userData,
      }),
    }),
    registration: builder.mutation({
      query: (userData) => ({
        url: "/api/user/registration",
        method: "POST",
        body: userData,
      }),
    }),
    checkAuth: builder.mutation({
      query: () => ({
        url: "/api/user/refresh",
        method: "GET",
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/api/user/logout",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLogInMutation,
  useLogOutMutation,
  useRegistrationMutation,
  useCheckAuthMutation,
} = authApiSlice;
