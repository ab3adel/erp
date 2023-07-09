import { Box } from "@mui/material";
import { GridFooter } from "@mui/x-data-grid-pro";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import { FunctionComponent } from "react";

interface ReceptionsTableFooterProps {
  apiRef: React.MutableRefObject<GridApiPro>;
}

const ReceptionsTableFooter: FunctionComponent<
  ReceptionsTableFooterProps
> = ({apiRef}) => {

  const containerStyle = {
    px: "24px",
    py: "14px",
    display: "flex",
    gap: "16px",
    flexGrow: 1,
    borderTop: "1px solid #dcdcdc",
    borderBottom: "1px solid #dcdcdc",
  };
  const valueChip = (value: string) => (
    <Box
      bgcolor="#EEEEEE"
      color="#757777"
      px="8px"
      fontSize="16px"
      fontWeight="700"
      borderRadius="4px"
    >
      {value}
    </Box>
  );

  console.log(apiRef.current.getSelectedRows())

  return (
    <Box mt="auto" display="flex" flexDirection="column">
      <Box sx={{ ...containerStyle }}>
        {valueChip("Total Quantity: 14,123.45 Kg")}
        {valueChip("/")}
        {valueChip("Total Weight: 34,568.45 Kg")}
        {valueChip("=")}
        {valueChip("Total Average Unit Cost: 2.45 USD/Kg")}
      </Box>
      <GridFooter />
    </Box>
  );
};

export default ReceptionsTableFooter;
