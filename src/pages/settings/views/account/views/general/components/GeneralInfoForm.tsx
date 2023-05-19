import { Stack, TextField, MenuItem, Box, Button } from "@mui/material";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { DateTimePicker } from "@mui/x-date-pickers";

export const GeneralInfoForm = () => {
  return (
    <Stack spacing={3} py={5}>
      <TextField
        variant="filled"
        label="Full Name"
        required
        sx={{ maxWidth: "440px" }}
      />
      <Box display="flex" columnGap={2} alignItems="center">
        <TextField
          variant="filled"
          label="Email Address"
          type="email"
          sx={{ width: "440px" }}
          InputProps={{
            endAdornment: (
              <VerifiedOutlinedIcon sx={{ color: "success.main" }} />
            ),
          }}
        />
        <Button variant="outlined">Change email</Button>
      </Box>
      <TextField
        variant="filled"
        label="Your Role"
        sx={{ maxWidth: "440px" }}
        select
      >
        <MenuItem value="1">Administrator</MenuItem>
        <MenuItem value="2">Manager</MenuItem>
        <MenuItem value="3">Employee</MenuItem>
      </TextField>
      <TextField
        variant="filled"
        label="Language"
        sx={{ maxWidth: "440px" }}
        select
      >
        <MenuItem value="1">English</MenuItem>
        <MenuItem value="2">Spanish</MenuItem>
      </TextField>
      <DateTimePicker
        slots={{
          textField: (props) => (
            <TextField
              {...props}
              variant="filled"
              sx={{ maxWidth: "440px" }}
              helperText="e.g. May 10, 2023, 05/09/2023, 06:20 PM EST, and 1,234.56 "
            />
          ),
        }}
        label="Date, time and number format"
        sx={{ maxWidth: "440px" }}
      />
      <Box mt={1}>
        <Button variant="contained">Save Changes</Button>
      </Box>
    </Stack>
  );
};
