import "./App.scss";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import { useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/constants";

function App() {
  const location = useLocation();
  const isAuth =
    location.pathname !== LOGIN_ROUTE &&
    location.pathname !== REGISTRATION_ROUTE;

  return (
    <>
      {isAuth && <NavBar />}
      <main className="page_content">
        <AppRouter />
      </main>
    </>
  );
}

export default App;

//think about token and user inside redux store. Do i have to use it inside if i use local storage?
