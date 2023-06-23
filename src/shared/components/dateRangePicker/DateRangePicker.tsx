import { FunctionComponent } from "react";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { Box, Typography } from "@mui/material";

interface DateRangePickerProps {}

const DateRangePicker: FunctionComponent<DateRangePickerProps> = () => {
  return (
    <Box>
      <Box>
        <Typography variant="overline" color="text.secondary">
          SELECT DATE RANGE
        </Typography>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangeCalendar />
      </LocalizationProvider>
    </Box>
  );
};

export default DateRangePicker;
