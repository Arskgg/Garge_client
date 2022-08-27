import React, { useState } from "react";

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
  USER_ROUTE,
} from "../../utils/constants";
import Loading from "../Loading/Loading";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../store/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();

  const [toggleUserMenu, setToggleUserMenu] = useState(false);
  const user = localStorage.getItem("user");

  const logOutHandler = () => {
    dispatch(logOutUser());
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
                <img src={logo} alt="profile" />

                {toggleUserMenu && (
                  <div className="profile-menu__container">
                    <ul className="profile-menu__items">
                      <li className="profile-menu__link">
                        <Link to={USER_ROUTE}>
                          <PortraitIcon />
                          <p>Profile</p>
                        </Link>
                      </li>
                      <li className="profile-menu__link">
                        <Link to={LOGIN_ROUTE} onClick={logOutHandler}>
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
