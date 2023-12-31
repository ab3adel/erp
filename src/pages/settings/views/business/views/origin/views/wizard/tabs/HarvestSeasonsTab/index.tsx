import dayjs from "dayjs";
import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Section from "../../../../components/Section";
import { useOriginSettingsRows } from "../../../../hooks/utils";
import DataGrid from "../../components/EditableDatagrid";
import { Row, useHarvestSeasonsColumns } from "./columns";
import { uniqueId } from "lodash";

const Tab = () => {
  const { rows, addRow, handleRowChange } = useOriginSettingsRows<Row>(
    "harvest_seasons",
    "main",
    {
      customMapper: (row) => ({
        ...row,
        id: row.id ?? uniqueId(),
        start: dayjs(row.start),
        end: dayjs(row.end),
      }),
    }
  );

  const columns = useHarvestSeasonsColumns();

  return (
    <Box>
      <Typography variant="h6" mb={3}>
        What are your harvest seasons?
      </Typography>
      <Section
        title="Harvest Seasons"
        headline="Configure Harvest Season Periods"
        subheadline="Please specify your harvest seasons for this region."
      >
        <DataGrid
          columns={columns}
          rows={rows}
          processRowUpdate={handleRowChange}
        />
        <Button
          variant="text"
          startIcon={<AddIcon />}
          sx={{ mt: 1 }}
          onClick={() => addRow()}
        >
          New Harvest Season
        </Button>
      </Section>
    </Box>
  );
};

export default Tab;
