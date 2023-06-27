import { Box, Typography } from "@mui/material";
import Section from "../../../../components/Section";
import { useOriginSettingsRows } from "../../../../hooks/utils";
import DataGrid from "../../components/EditableDatagrid";
import { Row, useYieldEstimationsColumns } from "./columns";

const Tab = () => {
  const { rows, handleRowChange: rowChanged } = useOriginSettingsRows<Row>(
    "yield_estimations",
    "main"
  );

  const handleRowChange = (newRow: Row) => {
    const cherryToWet = newRow.cherry_to_wet ?? 100;
    const wetToDry = newRow.wet_to_dry ?? 100;
    const dryToGreen = newRow.dry_to_green ?? 100;
    const newRowClone = {
      ...newRow,
      total: cherryToWet * wetToDry * dryToGreen * 1e-4,
    };
    rowChanged(newRowClone);
    return newRowClone;
  };

  const columns = useYieldEstimationsColumns();
  return (
    <Box>
      <Typography variant="h6" mb={3}>
        What are your yield estimations?
      </Typography>
      <Section
        title="Processing Method Yield"
        headline="Configure Yield Estimations"
        subheadline="These are your yield estimations for the processing methods you specified previously"
        example={[
          "“Wet” = Wet Parchment",
          "”Dry” = Dry Cherry or Dry Parchment",
          "”Green” = Green or Exportable Green",
        ]}
      >
        <DataGrid
          columns={columns}
          rows={rows}
          processRowUpdate={handleRowChange}
        />
      </Section>
    </Box>
  );
};

export default Tab;
