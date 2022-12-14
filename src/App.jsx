import "./App.scss";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCheckAuthMutation } from "./services/authApiSlice";
import { setCredentials } from "./store/authSlice";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  const [checkAuth] = useCheckAuthMutation();

  const location = useLocation();
  const isNavBar =
    location.pathname !== LOGIN_ROUTE &&
    location.pathname !== REGISTRATION_ROUTE &&
    location.pathname.slice(0, 5) !== "/post";

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
      {isNavBar && <NavBar />}
      <main className={`${isNavBar ? "page_content" : "main"}`}>
        <AppRouter />
      </main>
      {isNavBar && <Footer />}
    </>
  );
}

export default App;

// Implement checkAuth and RefreshToken
