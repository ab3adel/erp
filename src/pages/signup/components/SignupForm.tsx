import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useSignupForm } from "../hooks/useSignupForm";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const { getFieldProps, dirty, errors, touched, isValid, handleSubmit } =
    useSignupForm();
  const navigate = useNavigate();

  return (
    <Stack
      spacing={2}
      component="form"
      onSubmit={handleSubmit}
      width={{ xs: "100%", md: "380px" }}
    >
      <Box>
        <Typography
          fontFamily="Public Sans"
          color="#272930"
          fontSize={20}
          gutterBottom
        >
          Sign Up
        </Typography>
      </Box>
      <FormControl>
        <FormLabel sx={{ mb: 1, color: "#292A2ABF", fontSize: 14 }}>
          Username/Email
        </FormLabel>
        <TextField
          variant="outlined"
          fullWidth
          {...getFieldProps("username")}
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username}
        />
      </FormControl>
      <FormControl>
        <FormLabel sx={{ mb: 1, color: "#292A2ABF", fontSize: 14 }}>
          Password
        </FormLabel>
        <TextField
          variant="outlined"
          fullWidth
          type="password"
          {...getFieldProps("password")}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
      </FormControl>
      <FormControl error={touched.acceptTerms && Boolean(errors.acceptTerms)}>
        <FormControlLabel
          control={
            <Checkbox
              {...getFieldProps("acceptTerms")}
              color="primary"
              checked={getFieldProps("acceptTerms").value}
            />
          }
          label={
            <Typography>
              I accept the{" "}
              <Link sx={{ textDecoration: "none" }}>terms and conditions</Link>
            </Typography>
          }
        />
        <FormHelperText>
          {touched.acceptTerms && errors.acceptTerms}
        </FormHelperText>
      </FormControl>
      <Button fullWidth disabled={!dirty || !isValid} type="submit">
        Signup
      </Button>
      <Box display="flex" columnGap={2}>
        <Link
          fontWeight={500}
          sx={{ cursor: "pointer", textDecoration: "none" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          Login to account
        </Link>
        <Link
          fontWeight={500}
          sx={{ cursor: "pointer", textDecoration: "none" }}
        >
          Forgot password?
        </Link>
      </Box>
    </Stack>
  );
};
