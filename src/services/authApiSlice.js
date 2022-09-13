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
        invalidatesTags: ["User"],
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/api/user/logout",
        method: "GET",
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `api/user/${id}`,
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `api/user/update/${userId}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    followUser: builder.mutation({
      query: ({ userId, followerId }) => ({
        url: `api/user/follow/${userId}`,
        method: "PATCH",
        body: { followerId },
      }),
      invalidatesTags: ["User"],
    }),
    getUserFollowers: builder.query({
      query: (userId) => ({
        url: `api/user/followers/${userId}`,
      }),
      providesTags: ["User"],
    }),
    getUserFollowing: builder.query({
      query: (userId) => ({
        url: `api/user/following/${userId}`,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLogInMutation,
  useLogOutMutation,
  useRegistrationMutation,
  useCheckAuthMutation,
  useGetUserQuery,
  useFollowUserMutation,
  useGetUserFollowersQuery,
  useGetUserFollowingQuery,
  useUpdateUserMutation,
} = authApiSlice;
