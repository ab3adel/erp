import { Box, Card, TextField } from "@mui/material";
import SaturationPicker from "./SaturationPicker";
import HuePicker from "./HuePicker";

type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
};

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  return (
    <Card variant="outlined">
      <SaturationPicker
        color={color}
        onChange={(color) => onChange(color.hex)}
      />
      <Box sx={{ display: "flex", gap: "24px", padding: "15px" }}>
        <TextField
          variant="filled"
          value={color}
          onChange={(e) => onChange(e.target.value)}
        />
        <Box
          sx={{
            height: "56px",
            width: "74px",
            borderRadius: "2px",
            backgroundColor: color,
          }}
        />
        <Box display="flex" alignItems="center">
          <HuePicker color={color} onChange={(color) => onChange(color.hex)} />
        </Box>
      </Box>
    </Card>
  );
};

export default ColorPicker;
