import { Box } from "@mui/material";
import {
  GridFooter,
  gridRowSelectionStateSelector,
  gridRowsLookupSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid-pro";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import { FunctionComponent } from "react";
import FormulaFooter from "../formulaFooter/FormulaFooter";
import { DataGridRow } from "../../types";

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

  const apiRef = useGridApiContext();

  const rows = useGridSelector(apiRef, gridRowsLookupSelector);
  const rowsSelection = apiRef.current.getSelectedRows();
  const rowsArr: DataGridRow[] = Object.keys(rows).map((key) => ({
    id: key,
    ...rows[key],
  }));

  const totalCost =
    rowsSelection.size !== 0
      ? Array.from(rowsSelection.values()).reduce(
          (acc, row) => acc + row?.total_price ?? 0,
          0
        )
      : rowsArr.reduce((acc, row) => acc + row?.total_price ?? 0, 0);
  const totalWeight =
    rowsSelection.size !== 0
      ? Array.from(rowsSelection.values()).reduce(
          (acc, row) => acc + row?.total_price ?? 0,
          0
        )
      : rowsArr.reduce((acc, row) => acc + row.weight, 0);

  const totalCostStr = `Total Cost: USD$${totalCost.toLocaleString()}`;
  const totalWeightStr = `Total Weight: ${totalWeight.toLocaleString()} Kg`;
  const tatalAvargeUnitCostStr = `Total Average Unit Cost: ${
    totalCost / totalWeight
  } USD/Kg`;

  return (
    <Box mt="auto" display="flex" flexDirection="column">
      <Box sx={{ ...containerStyle }}>
        <FormulaFooter
          formulaList={[totalCostStr, "/", totalWeightStr]}
          result={tatalAvargeUnitCostStr}
        />
      </Box>
      <GridFooter />
    </Box>
  );
};

export default ReceptionsTableFooter;
