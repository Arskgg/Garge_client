import { Autocomplete, Chip } from "@mui/material";
import StyledInput from "../../../../components/Input/StyledInput";

const SelectorInput = ({
  options,
  handleChange,
  multiple,
  name,
  label,
  tags,
  placeHolder,
}) => {
  return (
    <Autocomplete
      sx={{ backgroundColor: "#fff" }}
      id="free-solo-demo2"
      freeSolo
      multiple={multiple}
      options={options}
      onChange={(e, value) => tags && handleChange(name, value)}
      onInputChange={(e, value) => !tags && handleChange(name, value)}
      renderTags={
        tags &&
        ((value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          )))
      }
      handleHomeEndKeys
      renderInput={(params) => (
        <StyledInput
          {...params}
          name={name}
          label={label}
          placeholder={placeHolder}
        />
      )}
    />
  );
};

export default SelectorInput;
