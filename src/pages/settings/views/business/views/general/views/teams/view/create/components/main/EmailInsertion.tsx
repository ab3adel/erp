import { FunctionComponent } from "react";
import { Box, TextField, Typography } from "@mui/material";

interface EmailInsertionProps {}

const EmailInsertion: FunctionComponent<EmailInsertionProps> = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight={450}
    >
      <Box>
        <Box textAlign="center">
          <Typography variant="h6" fontWeight={500} color="text.primary">
            Invite a new team member to your{" "}
            <Typography fontWeight="700" display="inline">
              Long Miles Burundi
            </Typography>{" "}
            organization
          </Typography>

          <Typography
            sx={{ mt: 1 }}
            display="block"
            variant="body1"
            color="text.secondary"
          >
            Enter a valid email address to request them to join your M·Cultivo
            account
          </Typography>
        </Box>

        <Box mt={4}>
          <TextField label="Email Address" variant="filled" fullWidth />
        </Box>
      </Box>
    </Box>
  );
};

export default EmailInsertion;
