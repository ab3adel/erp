import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import sendCheck from "@/assets/images/sent-check.svg";

interface AcknowledgeProps {
  email: string;
  organiztionName: string;
}

const Acknowledge: FunctionComponent<AcknowledgeProps> = (props) => {
  const { email, organiztionName } = props;

  return (
    <Box
      minHeight={400}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box textAlign="center">
        <Box my={1}>
          <img src={sendCheck} width={40} />
        </Box>
        <Box my={1}>
          <Typography variant="h6" fontWeight={500}>
            Invite Sent! <span style={{ fontWeight: 700 }}>{email}</span> is now
            part of your{" "}
            <span style={{ fontWeight: 700 }}>{organiztionName}</span>{" "}
            organization
          </Typography>
        </Box>
        <Box my={1}>
          <Typography
            variant="body1"
            fontWeight={400}
            color="text.secondary"
            fontSize={16}
          >
            Your team member will receive a notification to join M·Cultivo App
            shortly
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Acknowledge;
