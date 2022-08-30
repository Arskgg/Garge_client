import React from "react";
import logo from "../../assets/barnd/garage_main_logo_transparent.png";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Auth.module.scss";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { registerUser, loginUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      dispatch(loginUser({ userData, navigate }));
    } else {
      dispatch(registerUser({ userData, navigate }));
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.auth__container}>
        <div className={styles.auth__about}>
          <div className={styles.auth__logo}>
            <img src={logo} alt="Brand Logo" />
          </div>
          <div className={styles.auth__title}>
            <div className={styles.auth__description}>
              <h2>Social networks for fans of unusual cars</h2>
            </div>

            <div className={styles.auth__slogan}>
              <h4>Park your car here!</h4>
            </div>
          </div>
        </div>

        <div className={styles.auth__form}>
          <form action="" className={styles.form__container}>
            <div className={styles.form__content}>
              <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
              <LockRoundedIcon />
              {!isLogin && (
                <Input
                  name={"username"}
                  label={"Username"}
                  type={"text"}
                  autoComplete="new-password"
                  handleChange={handleChange}
                  required
                />
              )}
              <Input
                name={"email"}
                label={"Email"}
                type={"email"}
                required
                handleChange={handleChange}
              ></Input>
              <Input
                name={"password"}
                label={"Password"}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
                required
              />

              {!isLogin && (
                <Input
                  name={"confirmPassword"}
                  label={"Confirm Password"}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  handleChange={handleChange}
                  required
                />
              )}
              <Button onClick={handleSubmit}>
                {isLogin ? "Log In" : "Sign Up"}
              </Button>
              <div className={styles.form__switch}>
                {isLogin ? (
                  <div>
                    <Link to={REGISTRATION_ROUTE}>
                      Don't have an account? Sign Up
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link to={LOGIN_ROUTE}>Have an account ? Log In</Link>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
