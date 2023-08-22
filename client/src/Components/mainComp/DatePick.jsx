import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

function DatePick({ onDateChange }) {
  const [date, setDate] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Select a date"
        value={date}
        onChange={(newDate) => onDateChange(newDate)}
        textField={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default DatePick;
