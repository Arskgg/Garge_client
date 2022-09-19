import React, { useEffect } from "react";
import StyledInput from "./StyledInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import { useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/constants";

const Input = ({
  label,
  type,
  name,
  autoComplete,
  handleChange,
  handleShowPassword,
  placeHolder,
  multiline,
  minRows,
  select,
  children,
  value,
  required,
  pattern,
  errorMessage,
  error,
  setError,
  confirmPassword,
  disabled,
}) => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === LOGIN_ROUTE ||
    location.pathname === REGISTRATION_ROUTE;

  useEffect(() => {
    if (value === "" && isAuthPage) {
      setError((prev) => ({ ...prev, [name]: false }));
    }
  }, [value]);

  const handleBlur = () => {
    if (pattern && value !== "") {
      const rq = new RegExp(pattern);

      setError((prev) => ({ ...prev, [name]: !rq.test(value) }));
    }

    if (name === "confirmPassword" && value !== "") {
      setError((prev) => ({ ...prev, [name]: confirmPassword !== value }));
    }

    if (name === "email" && value !== "") {
      setError((prev) => ({ ...prev, [name]: !value.includes("@") }));
    }
  };

  return (
    <StyledInput
      sx={{ backgroundColor: "#fff", borderRadius: "6px" }}
      name={name}
      label={label}
      type={type}
      select={select}
      value={value}
      autoComplete={autoComplete}
      onChange={handleChange}
      placeholder={placeHolder}
      multiline={multiline}
      minRows={minRows}
      required={required}
      error={error}
      onBlur={isAuthPage ? handleBlur : null}
      helperText={error && errorMessage}
      InputProps={
        name === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    >
      {children}
    </StyledInput>
  );
};

export default Input;
