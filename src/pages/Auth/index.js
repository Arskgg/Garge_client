import logo from "../../assets/barnd/garage_main_logo_transparent.png";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Auth.module.scss";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
} from "../../utils/constants";
import Loading from "../../components/Loading";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../store/authSlice";
import {
  useLogInMutation,
  useRegistrationMutation,
} from "../../services/authApiSlice";

const Auth = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === LOGIN_ROUTE);
  const [authError, setAuthError] = useState(null);
  const [validationError, setValidationError] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLogInMutation();
  const [registration, { isLoading }] = useRegistrationMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleAuthChange = () => {
    setIsLogin((prev) => !prev);
    setAuthError(null);
    setUserData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const user = await login(userData).unwrap();
        dispatch(setCredentials(user));
        navigate(HOME_ROUTE);
      } catch (error) {
        setAuthError(error.data.message);
      }
    } else {
      try {
        if (Object.values(validationError).every((err) => err === false)) {
          const user = await registration(userData).unwrap();
          dispatch(setCredentials(user));
          navigate(HOME_ROUTE);
        }
      } catch (error) {
        setAuthError(error.data.message);
      }
    }
  };

  return (
    <div className={styles.auth}>
      {isLoading && <Loading />}
      <div className={styles.auth__container}>
        <div className={styles.auth__about}>
          <div className={styles.auth__logo}>
            <img src={logo} alt="Brand Logo" />
          </div>
          <div className={styles.auth__title}>
            <div className={styles.auth__description}>
              <h2>Social network for fans of unusual cars</h2>
            </div>

            <div className={styles.auth__slogan}>
              <h4>Park your car here!</h4>
            </div>
          </div>
        </div>

        <div className={styles.auth__form}>
          <form className={styles.form__container} onSubmit={handleSubmit}>
            <div className={styles.form__content}>
              <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
              <LockRoundedIcon />
              {authError && (
                <div className={styles.form__error}>{authError}</div>
              )}

              {!isLogin && (
                <Input
                  name={"username"}
                  label={"Username"}
                  type={"text"}
                  autoComplete="new-password"
                  handleChange={handleChange}
                  value={userData.username}
                  required
                  error={validationError.username}
                  setError={setValidationError}
                  pattern="^[a-z0-9_]{4,16}$"
                  errorMessage="Username should be 4-16 characters and includes numbers or small letters only!"
                />
              )}
              <Input
                name={"email"}
                label={"Email"}
                type={"email"}
                value={userData.email}
                handleChange={handleChange}
                required
                error={validationError.email}
                setError={setValidationError}
                errorMessage="It Should be valid email address!"
              ></Input>
              <Input
                name={"password"}
                label={"Password"}
                value={userData.password}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
                required
                error={validationError.password}
                setError={setValidationError}
                pattern={
                  !isLogin && "^(?=.*\\d)(?=.*[a-zA-Z])(?=.*[\\W_]).{8,20}$"
                }
                errorMessage="Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character"
              />

              {!isLogin && (
                <Input
                  name={"confirmPassword"}
                  label={"Confirm Password"}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  handleChange={handleChange}
                  value={userData.confirmPassword}
                  required
                  error={validationError.confirmPassword}
                  setError={setValidationError}
                  confirmPassword={userData.password}
                  errorMessage="Passwords doesn't match"
                />
              )}
              <Button>{isLogin ? "Log In" : "Sign Up"}</Button>
              <div className={styles.form__switch}>
                {isLogin ? (
                  <div className={styles.form__switch_btn}>
                    <Link to={REGISTRATION_ROUTE} onClick={handleAuthChange}>
                      Don't have an account? Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className={styles.form__switch_btn}>
                    <Link to={LOGIN_ROUTE} onClick={handleAuthChange}>
                      Have an account ? Log In
                    </Link>
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
