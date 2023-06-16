import { Stack, TextField, MenuItem, Box, Button } from "@mui/material";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useMeQuery } from "../../../hooks/useMeQuery";
import { languages } from "@/shared/schemas/available-languages";
import { formats } from "@/shared/schemas/available-date-format";
import { useFormik } from "formik";
import { Params } from "../../../types/profile.types";
import { useEffect } from "react";
import * as Yup from "yup";
import { useProfileUpdateMutation } from "../../../hooks/useProfileUpdateMutation";
import { hasChanges } from "@/shared/utils/objectDiffCompare";
import ChangeEmail from "../containers/ChangeEmail";

interface Form extends Pick<Params, "date_format" | "language" | "name"> {
  email: string;
}

const validationSchema = Yup.object().shape({
  date_format: Yup.string()
    .required("Date format is required")
    .oneOf(formats.map((item) => item.format)),
  language: Yup.string()
    .required("Language is required")
    .oneOf(languages.map((item) => item.value)),
  name: Yup.string().required("Name is required"),
  // email: Yup.string().email("Invalid email").required("Email is required"),
});

export const GeneralInfoForm = () => {
  const { data, loading: loadingProfileData } = useMeQuery();

  const [mutateProfile] = useProfileUpdateMutation();

  const form = useFormik<Form>({
    initialValues: { date_format: "", language: "", name: "", email: "" },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, action) => {
      mutateProfile({ variables: values }).finally(() => {
        action.setSubmitting(false);
      });
    },
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
        error={!!form.errors.name}
        helperText={form.errors.name}
      />
      <Box display="flex" columnGap={2} alignItems="center">
        <TextField
          variant="filled"
          label="Email Address"
          type="email"
          sx={{ width: "440px" }}
          onChange={form.handleChange}
          value={form.values.email}
          InputProps={{
            endAdornment: (
              <VerifiedOutlinedIcon sx={{ color: "success.main" }} />
            ),
          }}
          error={!!form.errors.email}
          helperText={form.errors.email}
          disabled={true}
        />
        <ChangeEmail />
      </Box>
      <TextField
        variant="filled"
        label="Your Role"
        sx={{ maxWidth: "440px" }}
        select
        disabled
        // error={!!form.errors.role}
        // helperText={form.errors.role}
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
        error={!!form.errors.language}
        helperText={form.errors.language}
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
        error={!!form.errors.date_format}
        helperText={form.errors.date_format}
      >
        {formats.map((item) => (
          <MenuItem value={item.format} key={item.format}>
            {item.country}
          </MenuItem>
        ))}
      </TextField>

      <Box mt={1}>
        <Button
          disabled={
            form.isSubmitting ||
            loadingProfileData ||
            !hasChanges(form.values, {
              name: data?.me?.name,
              date_format: data?.me?.profile.date_format,
              language: data?.me?.profile.language,
            })
          }
          variant="contained"
          onClick={form.submitForm}
        >
          Save Changes
        </Button>
      </Box>
    </Stack>
  );
};
