import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../store/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status == 401) {
    //Sending refresh token
    const refreshResult = await baseQuery(
      "/api/user/refresh",
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      //store New Token
      api.dispatch(setCredentials({ ...refreshResult.data }));
      // retry the original query with new accsess token
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery("/api/user/logout", api, extraOptions);
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Posts", "Comments"],
  endpoints: (builder) => ({}),
});
