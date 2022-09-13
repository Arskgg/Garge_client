import logo from "../../assets/barnd/garage-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import PortraitIcon from "@mui/icons-material/Portrait";
import { Link } from "react-router-dom";
import "./styles.scss";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  POST_CREATE_ROUTE,
  REGISTRATION_ROUTE,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogOutMutation } from "../../services/authApiSlice";
import { logOut, selectCurrentUser } from "../../store/authSlice";
import { useState } from "react";
import UserImg from "../UserImg";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logOutFromServer] = useLogOutMutation();

  const [toggleUserMenu, setToggleUserMenu] = useState(false);
  const user = useSelector(selectCurrentUser);

  const handleLogOut = async () => {
    try {
      await logOutFromServer();
      dispatch(logOut());
      navigate(LOGIN_ROUTE);
    } catch (error) {}
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <Link to={HOME_ROUTE} className="navbar__logo-link">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="navbar__search">
          <input type="text" placeholder="Search" />
          <span>
            <SearchIcon />
          </span>
        </div>

        <div className="navbar__menu menu">
          {user ? (
            <>
              <div className="menu__create-post">
                <Link to={POST_CREATE_ROUTE}>
                  <AddBoxIcon />
                </Link>
              </div>
              <div
                className="menu__profile profile-menu"
                onClick={() => setToggleUserMenu((prev) => !prev)}
              >
                {user.img ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${user.img}`}
                    alt="profile"
                  />
                ) : (
                  <UserImg username={user.username} />
                )}

                {toggleUserMenu && (
                  <div className="profile-menu__container">
                    <ul className="profile-menu__items">
                      <li className="profile-menu__link">
                        <Link to={`/user/${user.id}`}>
                          <PortraitIcon />
                          <p>Profile</p>
                        </Link>
                      </li>
                      <li className="profile-menu__link">
                        <Link to={LOGIN_ROUTE} onClick={handleLogOut}>
                          <LogoutIcon />
                          Log Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to={REGISTRATION_ROUTE} className="menu__signup">
                Sign Up
              </Link>
              <div className="menu__login">
                <Link to={LOGIN_ROUTE} className="menu__login-btn">
                  Log In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
