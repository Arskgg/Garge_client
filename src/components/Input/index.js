import styled from "@emotion/styled";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#e79115",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#e79115",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#e79115",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e79115",
    },
  },
});

const Input = ({
  label,
  type,
  name,
  autoComplete,
  handleChange,
  handleShowPassword,
}) => {
  return (
    <CssTextField
      sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
      name={name}
      label={label}
      type={type}
      autoComplete={autoComplete}
      onChange={handleChange}
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
    />
  );
};

export default Input;
