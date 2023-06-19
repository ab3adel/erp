import { Box, Button, Typography } from "@mui/material";

const DownloadData = () => {
  return (
    <Box p={3} pt="38px" height="100%">
      <Box maxWidth="540px">
        <Typography variant="h6" mb={1} fontWeight={500}>
          Request Data
        </Typography>
        <Typography variant="body1" mb={4} fontWeight={400}>
          Request your complete account data from the M·Cultivo support team and
          receive a downloadable ZIP file (.zip). The shared ZIP file will
          contain all data tables and attached documents from your
          organization(s).
        </Typography>
        <Button variant="contained">Request Data</Button>
      </Box>
    </Box>
  );
};

export default DownloadData;
