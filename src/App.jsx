import "./App.scss";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCheckAuthMutation } from "./services/authApiSlice";
import { setCredentials } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkAuth] = useCheckAuthMutation();

  const location = useLocation();
  const isAuthPage =
    location.pathname !== LOGIN_ROUTE &&
    location.pathname !== REGISTRATION_ROUTE;

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const checkUserAuth = async () => {
        try {
          const { data } = await checkAuth();
          dispatch(setCredentials({ token: data.token }));
        } catch (error) {}
      };

      checkUserAuth();
    }
  }, [dispatch, checkAuth]);

  return (
    <>
      {isAuthPage && <NavBar />}
      <section className="page_content">
        <AppRouter />
      </section>
    </>
  );
}

export default App;

// Implement checkAuth and RefreshToken
