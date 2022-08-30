import Auth from "./pages/Auth";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import PostForm from "./pages/PostForm/PostForm";
import UserProfile from "./pages/UserProfile";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  POST_CREATE_ROUTE,
  POST_ROUTE,
  REGISTRATION_ROUTE,
  USER_ROUTE,
} from "./utils/constants";

export const authRoutes = [
  { path: POST_CREATE_ROUTE, Component: <PostForm /> },
];

export const publicRoutes = [
  { path: HOME_ROUTE, Component: <Home /> },
  { path: POST_ROUTE, Component: <PostDetails /> },
  { path: USER_ROUTE, Component: <UserProfile /> },
  { path: LOGIN_ROUTE, Component: <Auth /> },
  { path: REGISTRATION_ROUTE, Component: <Auth /> },
];
