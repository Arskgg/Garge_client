import Auth from "./pages/Auth";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import PostForm from "./pages/PostForm/PostForm";
import PostUpdate from "./pages/PostUpdate";
import UserProfile from "./pages/UserProfile";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  POST_CREATE_ROUTE,
  POST_DETAILS_ROUTE,
  POST_UPDATE_ROUTE,
  REGISTRATION_ROUTE,
  USER_ROUTE,
} from "./utils/constants";

export const authRoutes = [
  { path: POST_CREATE_ROUTE, Component: <PostForm /> },
  { path: POST_UPDATE_ROUTE, Component: <PostUpdate /> },
];

export const publicRoutes = [
  { path: HOME_ROUTE, Component: <Home /> },
  { path: POST_DETAILS_ROUTE, Component: <PostDetails /> },
  { path: USER_ROUTE, Component: <UserProfile /> },
  { path: LOGIN_ROUTE, Component: <Auth /> },
  { path: REGISTRATION_ROUTE, Component: <Auth /> },
];
