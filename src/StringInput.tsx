import React, { useState } from "react";
import { TextField } from "@material-ui/core";

interface SIProps {
  inputId: string;
  label: string;
}

const StringInput: React.FC<SIProps> = ({ inputId, label }) => {
  const [value, setValue] = useState("");
  return (
    <TextField
      id={inputId}
      label={label}
      value={value}
      onChange={e => setValue(e.target.value)}
      fullWidth
      margin="normal"
    />
  );
};

export default StringInput;
