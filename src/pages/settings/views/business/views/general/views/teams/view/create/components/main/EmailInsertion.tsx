import { FunctionComponent } from "react";
import { Box, TextField, Typography } from "@mui/material";

interface EmailInsertionProps {
  name: string;
  email: string;
  onEmailChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}

const EmailInsertion: FunctionComponent<EmailInsertionProps> = (props) => {
  const { name, email, onEmailChange } = props;

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
              {name}
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
          <TextField
            label="Email Address"
            variant="filled"
            fullWidth
            value={email}
            onChange={onEmailChange}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EmailInsertion;
