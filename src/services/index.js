import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (request) => {
  request.headers.authorization = `Bearer ${
    localStorage.getItem("user").token
  }`;

  console.log(localStorage.getItem("user").token);
  return request;
};

authAPI.interceptors.request.use(authInterceptor);

export { API, authAPI };
