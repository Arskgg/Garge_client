import { apiSlice } from "./apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (search) => ({ url: `api/posts?search=${search}` }),
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

    updatePost: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/posts/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `api/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    getPostById: builder.query({
      query: (id) => ({ url: `api/posts/${id}` }),
      providesTags: [{ type: "Posts", id: "LIST" }],
    }),

    getUserPosts: builder.query({
      query: (id) => ({ url: `api/posts/user/${id}` }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetUserPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApiSlice;
