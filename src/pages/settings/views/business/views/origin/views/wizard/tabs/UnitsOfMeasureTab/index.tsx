import { Box, Typography } from "@mui/material";
import WeightSection from "./weight";
import VolumeSection from "./volume";
import AreaSection from "./area";
import WeightToVolumeSection from "./weightToVolume";

const Tab = () => {
  return (
    <Box>
      <Typography variant="h6" mb={3}>
        What are your preferred units of measure for this origin?
      </Typography>
      <WeightSection />
      <VolumeSection />
      <WeightToVolumeSection />
      <AreaSection />
    </Box>
  );
};

export default Tab;
