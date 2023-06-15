import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

interface HelperChecksGeneraterProps {
  ChecksList: { label: string; checked?: boolean }[];
}

const HelperChecksGenerater: FunctionComponent<HelperChecksGeneraterProps> = (
  props
) => {
  const { ChecksList } = props;

  return (
    <Box display="flex" gap={3}>
      {ChecksList.map((item) => (
        <Box
          key={item.label}
          display="flex"
          alignItems="center"
          gap={1}
          color="text.secondary"
          fontSize={12}
        >
          {item.checked ? (
            <CheckCircleOutlineIcon sx={{ fontSize: "inherit" }} />
          ) : (
            <RadioButtonUncheckedIcon sx={{ fontSize: "inherit" }} />
          )}

          <Typography fontSize="inherit">{item.label}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default HelperChecksGenerater;
