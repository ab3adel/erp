import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { ColorPicker, PreviewDocument } from "../components";
import Dropzone from "@/shared/components/Dropzone";


const Branding = () => {
  const [color, setColor] = useState("#008E8F");

  return (
    <Box p={3} pt="38px">
      <Box maxWidth="540px">
        <Typography variant="h6" mb={1} fontWeight={500}>
          Report Customization
        </Typography>
        <Typography variant="body1" mb={3} fontWeight={400}>
          The details you added in the “Business Details” tab (address, email,
          company name, etc.) will appear on your reports.
        </Typography>
        <Typography mb={1} fontWeight={400}>
          Logo
        </Typography>
        <Box mb={3}>
          <Dropzone />
        </Box>
        <Typography mb={2} fontWeight={400}>
          Brand Color
        </Typography>
        <Box mb={3}>
          <ColorPicker color={color} onChange={setColor} />
        </Box>
        <Typography mb={2} fontWeight={400}>
          Document Preview
        </Typography>
        <Box>
          <PreviewDocument color={color} />
        </Box>
      </Box>
    </Box>
  );
};

export default Branding;
