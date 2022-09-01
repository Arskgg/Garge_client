import axios from "axios";
import { logOut } from "./userService";

const API = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

const authAPI = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (request) => {
  const token = JSON.parse(localStorage.getItem("user")).token;

  request.headers.authorization = `Bearer ${token}`;

  return request;
};

authAPI.interceptors.request.use(authInterceptor);

//interceptor For refresh token
authAPI.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalRequest = err.config;

    if (err.response.status === 401 && err.config && !err.config._isRetry) {
      originalRequest._isRetry = true;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/user/refresh`,
          { withCredentials: true }
        );
        localStorage.setItem(
          "user",
          JSON.stringify({
            user: response.data.user,
            token: response.data.token,
          })
        );
        return authAPI.request(originalRequest);
      } catch (error) {
        console.log("Unauthorized");
      }
    }
    throw err;
  }
);

export { API, authAPI };
