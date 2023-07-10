import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FunctionComponent } from "react";

interface FormulaFooterProps {
  formulaList: string[];
  result: string;
}

const FormulaFooter: FunctionComponent<FormulaFooterProps> = (props) => {
  const { formulaList, result } = props;

  const FormulaArray = [...formulaList, "=", result];
  return (
    <Stack direction="row" spacing={1}>
      {FormulaArray.map((item) => (
        <Box borderRadius={1} px={1} bgcolor={grey[200]} key={item}>
          <Typography fontWeight={700} color="text.secondary">
            {item}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
};

export default FormulaFooter;
