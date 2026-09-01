import TextField, { TextFieldProps } from "@mui/material/TextField";

const CustomTextField = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      variant="standard"
      sx={{width:"100%"}}
    />
  );
};

export default CustomTextField;
