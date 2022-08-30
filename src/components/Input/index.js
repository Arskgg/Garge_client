import React from "react";
import StyledInput from "./StyledInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";

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
}) => {
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
