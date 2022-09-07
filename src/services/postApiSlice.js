import { apiSlice } from "./apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({ url: "api/posts" }),
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(({ _id }) => ({ type: "Posts", _id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    createPost: builder.mutation({
      query: (formData) => ({
        url: "api/posts",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    getPostById: builder.query({
      query: (id) => ({ url: `api/posts/${id}` }),
    }),
  }),
});

export const { useCreatePostMutation, useGetPostsQuery, useGetPostByIdQuery } =
  postApiSlice;
