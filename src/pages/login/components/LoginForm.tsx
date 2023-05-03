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
import { useLoginForm } from "../hooks/useLoginForm";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const { getFieldProps, dirty, errors, touched, isValid, handleSubmit } =
    useLoginForm();
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
          Log In
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
              I accept the <Link>terms and conditions</Link>
            </Typography>
          }
        />
        <FormHelperText>
          {touched.acceptTerms && errors.acceptTerms}
        </FormHelperText>
      </FormControl>
      <Button fullWidth disabled={!dirty || !isValid} type="submit">
        Login
      </Button>
      <Box display="flex" columnGap={2}>
        <Link
          fontWeight={500}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Create account
        </Link>
        <Link fontWeight={500}>Forgot password?</Link>
      </Box>
    </Stack>
  );
};
