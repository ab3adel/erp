import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useState } from "react";

const DownloadData = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);

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
        <Button variant="contained" onClick={() => setShowSnackbar(true)}>
          Request Data
        </Button>
        <Snackbar
          anchorOrigin={{
            horizontal: "center",
            vertical: "top",
          }}
          open={showSnackbar}
          autoHideDuration={100000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert
            severity="info"
            sx={{ width: "100%" }}
            onClose={() => setShowSnackbar(false)}
          >
            Request sent! Expect a response from our team within 24 hours.
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default DownloadData;
