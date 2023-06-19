import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  FormControl,
  FormLabel,
} from "@mui/material";
import * as yup from "yup";

import HelperChecksGenerater from "./components/HelperChecksGenrater";
import { useLogic } from "./Security.logic";

export const Security = () => {
  const { form } = useLogic();

  return (
    <Box mx="24px" py={4}>
      <Typography
        variant="h2"
        fontWeight={700}
        sx={{ color: "common.black", pt: 1, pb: 4 }}
      >
        Change Password
      </Typography>
      <Stack spacing={3}>
        <FormControl>
          <FormLabel sx={{ mb: 2, color: "common.black" }}>
            Current Password
          </FormLabel>
          <TextField
            variant="filled"
            label="Please enter your current password"
            type="password"
            sx={{ width: "440px" }}
            name="current_password"
            value={form.values.current_password}
            onChange={form.handleChange}
            helperText={form.errors.current_password}
            error={!!form.errors.current_password}
          />
        </FormControl>
        <FormControl>
          <FormLabel sx={{ mb: 2, color: "common.black" }}>
            New Password
          </FormLabel>
          <TextField
            variant="filled"
            label="Please enter your new password"
            type="password"
            sx={{ width: "440px" }}
            name="password"
            value={form.values.password}
            onChange={form.handleChange}
            helperText={
              <HelperChecksGenerater
                ChecksList={[
                  {
                    label: "8 characters min.",
                    checked: yup
                      .string()
                      .min(8)
                      .isValidSync(form.values.password),
                  },
                  {
                    label: "1 uppercase",
                    checked: yup
                      .string()
                      .matches(/[A-Z]/)
                      .isValidSync(form.values.password),
                  },
                  {
                    label: "1 lowercase",
                    checked: yup
                      .string()
                      .matches(/[a-z]/)
                      .isValidSync(form.values.password),
                  },
                ]}
              />
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel sx={{ mb: 2, color: "common.black" }}>
            Confirm New Password
          </FormLabel>
          <TextField
            variant="filled"
            label="Please re-enter your new password"
            type="password"
            sx={{ width: "440px" }}
            name="password_confirmation"
            value={form.values.password_confirmation}
            onChange={form.handleChange}
            helperText={form.errors.password_confirmation}
            error={!!form.errors.password_confirmation}
          />
        </FormControl>
      </Stack>
      <Button
        disabled={form.isSubmitting}
        variant="contained"
        sx={{ mt: 3 }}
        onClick={form.submitForm}
      >
        Save Changes
      </Button>
    </Box>
  );
};
