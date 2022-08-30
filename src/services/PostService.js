import { authAPI } from "./index";

export const createPost = (postData) => authAPI.post("api/posts", postData);
