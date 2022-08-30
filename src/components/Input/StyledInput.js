import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export default styled(TextField)({
  "& label.Mui-focused": {
    color: "#e79115",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#e79115",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E0E0",
    },
    "&:hover fieldset": {
      borderColor: "#e79115",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e79115",
    },
  },
});
