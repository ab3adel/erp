import { Box, Button, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid-pro";
import dayjs from "dayjs";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import Section from "../../../components/Section";
import DataGrid, {
  cellCheckBox,
  cellDatePicker,
  cellTextField,
} from "../components/EditableDatagrid";

const columns: GridColDef[] = [
  {
    headerName: "Name",
    field: "name",
    flex: 1,
    sortable: false,
    renderCell: (params) => cellTextField(params, "Name", "Enter Harvest Name"),
  },
  {
    headerName: "Start",
    field: "start",
    flex: 1,
    sortable: false,
    renderCell: cellDatePicker,
  },
  {
    headerName: "End",
    field: "end",
    flex: 1,
    sortable: false,
    renderCell: cellDatePicker,
  },
  {
    headerName: "Show in Inventory",
    field: "inv",
    flex: 1,
    sortable: false,
    renderCell: cellCheckBox,
  },
];

const rows = [
  {
    id: "1",
    name: "2022 Harvest",
    start: dayjs("2022-02-01"),
    end: dayjs("2022-06-01"),
    inv: true,
  },
  {
    id: "2",
    name: "2022 Harvest",
    start: dayjs("2023-02-01"),
    end: dayjs("2023-06-01"),
    inv: true,
  },
  { id: "3", name: " " },
];

const Tab = () => {
  const [currentRows, setCurrentRows] = useState(rows);
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
        <DataGrid columns={columns} rows={currentRows} />
        <Button
          variant="text"
          startIcon={<Add />}
          sx={{ mt: 1 }}
          onClick={() =>
            setCurrentRows((prev) => [
              ...prev,
              { id: Date.now().toString(), name: " " },
            ])
          }
        >
          New Harvest Season
        </Button>
      </Section>
    </Box>
  );
};

export default Tab;
