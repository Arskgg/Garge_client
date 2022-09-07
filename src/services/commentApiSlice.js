import { apiSlice } from "./apiSlice";

const commentApiSlic = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query({
      query: (postId) => ({
        url: `api/posts/${postId}/comments`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Posts", _id })),
              { type: "Comments", id: "LIST" },
            ]
          : [{ type: "Comments", id: "LIST" }],
    }),
    commentPost: builder.mutation({
      query: ({ postId, commentData }) => ({
        url: `api/posts/${postId}/commentPost`,
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: [{ type: "Comments", id: "LIST" }],
    }),
  }),
});

export const { useGetCommentsByPostIdQuery, useCommentPostMutation } =
  commentApiSlic;
