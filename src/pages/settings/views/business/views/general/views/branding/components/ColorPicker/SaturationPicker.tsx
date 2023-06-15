import { Box } from "@mui/material";
import { CustomPicker, CustomPickerProps } from "react-color";
import { Saturation } from "react-color/lib/components/common";

const Circle = () => (
  <Box
    width="25px"
    height="25px"
    borderRadius="50%"
    sx={{ transform: "translate(-12.5px, -12.5px)", border: "2px solid white" }}
  />
);

const SaturationPickerWrapper = (props: CustomPickerProps<any>) => {
  return (
    <Box position="relative" height="82px">
      <Saturation {...props} pointer={Circle as any} />
    </Box>
  );
};

const SaturationPicker = CustomPicker(SaturationPickerWrapper);

export default SaturationPicker;
