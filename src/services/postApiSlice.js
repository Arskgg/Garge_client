import { apiSlice } from "./apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (formData) => ({
        url: "api/posts",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useCreatePostMutation } = postApiSlice;
