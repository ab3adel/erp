import { Box } from "@mui/material";
import { CustomPicker, CustomPickerProps } from "react-color";
import { Hue } from "react-color/lib/components/common";

const Ball = () => (
  <Box
    width="25px"
    height="25px"
    borderRadius="50%"
    sx={{
      transform: "translate(-12.5px, -4px)",
      bgcolor: "white",
      boxShadow: "rgba(0, 0, 0, 0.37) 0px 1px 4px 0px",
    }}
  />
);

const HuePickerWrapper = (props: CustomPickerProps<any>) => {
  return (
    <Box position="relative" height="18px" width="256px" borderRadius="50%">
      <Hue
        // I did this spreading because the radius prop does not exist on typ HueProps   
        {...{ ...props, radius: "8px" }}
        pointer={Ball as any}
      />
    </Box>
  );
};

const HuePicker = CustomPicker(HuePickerWrapper);

export default HuePicker;
