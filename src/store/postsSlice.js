import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { posts: [], isLoading: false };

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts: {},
  },
});
