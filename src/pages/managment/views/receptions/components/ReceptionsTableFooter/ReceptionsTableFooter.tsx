import { Box } from "@mui/material";
import { GridFooter } from "@mui/x-data-grid-pro";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import { FunctionComponent } from "react";
import FormulaFooter from "../formulaFooter/FormulaFooter";

interface ReceptionsTableFooterProps {
  apiRef: React.MutableRefObject<GridApiPro>;
}

const ReceptionsTableFooter: FunctionComponent<
  ReceptionsTableFooterProps
> = () => {
  const containerStyle = {
    px: "24px",
    py: "14px",
    display: "flex",
    gap: "16px",
    flexGrow: 1,
    borderTop: "1px solid #dcdcdc",
    borderBottom: "1px solid #dcdcdc",
  };

  return (
    <Box mt="auto" display="flex" flexDirection="column">
      <Box sx={{ ...containerStyle }}>
        <FormulaFooter
          formulaList={[
            "Total Cost: USD$84,568.45",
            "/",
            "Total Weight: 34,568.45 Kg",
          ]}
          result="Total Average Unit Cost: 2.45 USD/Kg"
        />
      </Box>
      <GridFooter />
    </Box>
  );
};

export default ReceptionsTableFooter;
