import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  FormControl,
  FormLabel,
} from "@mui/material";

export const Security = () => {
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
            type="email"
            sx={{ width: "440px" }}
          />
        </FormControl>
        <FormControl>
          <FormLabel sx={{ mb: 2, color: "common.black" }}>
            New Password
          </FormLabel>
          <TextField
            variant="filled"
            label="Please enter your new password"
            type="email"
            sx={{ width: "440px" }}
          />
        </FormControl>
        <FormControl>
          <FormLabel sx={{ mb: 2, color: "common.black" }}>
            Confirm New Password
          </FormLabel>
          <TextField
            variant="filled"
            label="Please re-enter your new password"
            type="email"
            sx={{ width: "440px" }}
          />
        </FormControl>
      </Stack>
      <Button variant="contained" sx={{ mt: 3 }}>
        Save Changes
      </Button>
    </Box>
  );
};
