import { Stack, TextField, MenuItem, Box, Button } from "@mui/material";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
// import { DateTimePicker } from "@mui/x-date-pickers";
import { useMeQuery } from "../../../hooks/useMeQuery";
import { languages } from "@/shared/schemas/available-languages";
import { formats } from "@/shared/schemas/available-date-format";
import { useFormik } from "formik";
import { Params } from "../../../types/profile.types";
import { useEffect } from "react";

interface Form extends Pick<Params, "date_format" | "language" | "name"> {
  email: string;
}

export const GeneralInfoForm = () => {
  const { data } = useMeQuery();

  const form = useFormik<Form>({
    initialValues: { date_format: "", language: "", name: "", email: "" },
    onSubmit: () => {},
  });

  useEffect(() => {
    if (data?.me)
      form.setValues({
        name: data.me.name,
        email: data.me.email,
        language: data.me.profile.language,
        date_format: data.me.profile.date_format,
      });
  }, [data]);

  return (
    <Stack spacing={3} py={5}>
      <TextField
        variant="filled"
        label="Full Name"
        required
        sx={{ maxWidth: "440px" }}
        value={form.values.name}
        name="name"
        onChange={form.handleChange}
      />
      <Box display="flex" columnGap={2} alignItems="center">
        <TextField
          variant="filled"
          label="Email Address"
          type="email"
          sx={{ width: "440px" }}
          onChange={form.handleChange}
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
        <MenuItem value="2">Bookkeeper</MenuItem>
        <MenuItem value="3">Sales</MenuItem>
        <MenuItem value="4">Washing Station Staff</MenuItem>
      </TextField>
      <TextField
        variant="filled"
        label="Language"
        sx={{ maxWidth: "440px" }}
        select
        value={form.values.language}
        name="language"
        onChange={form.handleChange}
      >
        {languages.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        variant="filled"
        label="Date, time and number format"
        sx={{ maxWidth: "440px" }}
        select
        // value={data?.me?.profile.date_format}
        value={form.values.date_format}
        name="date_format"
        onChange={form.handleChange}
        helperText={form.values.date_format}
      >
        {formats.map((item) => (
          <MenuItem value={item.format} key={item.format}>
            {item.country}
          </MenuItem>
        ))}
      </TextField>
      {/* <DateTimePicker
        slots={{
          textField: (props) => (
            <TextField
              {...props}
              variant="filled"
              sx={{ maxWidth: "440px" }}
              helperText="e.g. May 10, 2023, 05/09/2023, 06:20 PM EST, and 1,234.56"
            />
          ),
        }}
        label="Date, time and number format"
        sx={{ maxWidth: "440px" }}
        value={data?.me?.profile.date_format}
      /> */}
      <Box mt={1}>
        <Button variant="contained">Save Changes</Button>
      </Box>
    </Stack>
  );
};
