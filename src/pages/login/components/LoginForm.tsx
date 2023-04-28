import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const LoginForm = () => {
  return (
    <Stack spacing={2} component="form" width={{ xs: "100%", md: "380px" }}>
      <Box>
        <Typography
          fontFamily="Public Sans"
          color="#272930"
          fontSize={20}
          gutterBottom
        >
          Log In
        </Typography>
        <Typography variant="body2" sx={{ color: "grey.500" }}>
          Get started for free
        </Typography>
      </Box>
      <TextField variant="outlined" fullWidth placeholder="Username" />
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Password"
        type="password"
      />
      <FormControlLabel
        control={<Checkbox />}
        label="I accept the terms and conditions"
      />
      <Button fullWidth>Login</Button>
      <Box display="flex" columnGap={2}>
        <Link fontWeight={500} sx={{ cursor: "pointer" }}>
          Create account
        </Link>
        <Link fontWeight={500} sx={{ cursor: "pointer" }}>
          Forgot password?
        </Link>
      </Box>
    </Stack>
  );
};
