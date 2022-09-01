import { authAPI } from "./index";

export const createPost = (formData) => authAPI.post("api/posts", formData);
