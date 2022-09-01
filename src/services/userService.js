import { API } from "./index";

export const registration = (userData) =>
  API.post(`api/user/registration`, userData);

export const login = (userData) => API.post(`api/user/login`, userData);

export const refresh = () =>
  API.get(`api/user/refresh`, { withCredentials: true });

export const logOut = () => API.post(`api/user/logout`);
