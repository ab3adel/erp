import {
  Stack,
  TextField,
  MenuItem,
  Box,
  Button,
  Typography,
} from "@mui/material";
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
import AvatarInput from "./avatarInput/avatarInput";
import AvatarHelperText from "./AvatarHelperText";
import { convertFileToBase64 } from "@/shared/utils/fileToBase64Converter";
import { generateAbbreviation } from "@/shared/utils/nameAbbreviationGenerator";
import { useChangeProfileAvatar } from "../hooks/useChangeProfileAvatar";
import { resourceUrlGenerater } from "@/shared/utils/resourceUrlGenerater";

interface Form extends Pick<Params, "date_format" | "language" | "name"> {
  email: string;
  avatar?: string;
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

  const [mutateProfileAvatar] = useChangeProfileAvatar();

  const form = useFormik<Form>({
    initialValues: {
      date_format: "",
      language: "",
      name: "",
      email: "",
      avatar: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, action) => {
      const mutation_list = [];

      mutation_list.push(mutateProfile({ variables: values }));

      if (
        form.values.avatar &&
        form.values.avatar !== data?.me?.profile?.avatar?.[0]?.src
      )
        mutation_list.push(
          mutateProfileAvatar({ variables: { avatar: form.values.avatar } })
        );

      Promise.all(mutation_list).finally(() => {
        action.setSubmitting(false);
      });
    },
  });

  useEffect(() => {
    if (data?.me)
      form.setValues({
        name: data.me.name,
        email: data.me.email,
        language: data.me.profile?.language,
        date_format: data.me.profile?.date_format,
        avatar: data.me.profile?.avatar[0]?.src,
      });
  }, [data]);

  // update avatar preview status

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files)
      convertFileToBase64(event.target.files[0]).then((file) => {
        if (typeof file === "string") form.setFieldValue("avatar", file);
      });

    //reset the avatar field to inital if no file passed to input
    if (event.target.files?.length === 0) {
      form.setFieldValue("avatar", data?.me?.profile.avatar[0]?.src);
    }
  };

  return (
    <>
      <Box>
        <Typography variant="body1">Avatar</Typography>
        <AvatarInput
          src={
            form.values.avatar === data?.me?.profile?.avatar[0]?.src &&
            form.values.avatar
              ? resourceUrlGenerater(form.values.avatar)
              : form.values.avatar
          }
          onChange={handleImageUpload}
          helperText={<AvatarHelperText />}
          abbreviation={
            form.values.name
              ? generateAbbreviation(form.values.name)
              : undefined
          }
        />
      </Box>
      <Box py={2}>
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
                  date_format: data?.me?.profile?.date_format,
                  language: data?.me?.profile?.language,
                  avatar: data?.me?.profile?.avatar[0]?.src,
                })
              }
              variant="contained"
              onClick={form.submitForm}
            >
              Save Changes
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
