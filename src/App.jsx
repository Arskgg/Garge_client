import "./App.scss";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const isAuthPage =
    location.pathname !== LOGIN_ROUTE &&
    location.pathname !== REGISTRATION_ROUTE;

  useEffect(() => {
    if (localStorage.getItem("user")) dispatch(checkAuth(navigate));
  }, [dispatch, navigate]);

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

//think about token and user inside redux store. Do i have to use it inside if i use local storage?
