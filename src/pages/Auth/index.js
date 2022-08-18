import React from "react";
import logo from "../../assets/barnd/garage_main_logo_transparent.png";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.scss";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/constants";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__about">
          <div className="auth__logo">
            <img src={logo} alt="Brand Logo" />
          </div>
          <div className="auth__title">
            <div className="auth__description">
              <h2>Social networks for fans of unusual cars</h2>
            </div>

            <div className="auth__slogan">
              <h4>Park your car here!</h4>
            </div>
          </div>
        </div>

        <div className="auth__form form">
          <form action="" className="form__container">
            <div className="form__content">
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
              <div className="form__switch-btn">
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
