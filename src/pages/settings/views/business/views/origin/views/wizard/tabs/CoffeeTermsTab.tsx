import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { GridColDef, GridRowId } from "@mui/x-data-grid-pro";
import Section from "../../../components/Section";
import DataGrid, {
  cellDeleteAction,
  cellSelect,
  cellTextField,
} from "../components/EditableDatagrid";
import { useCallback, useMemo, useState } from "react";

const rows = [
  {
    id: "1",
    ours: "Cherry",
  },
  {
    id: "2",
    ours: "Wet Parchment",
  },
  {
    id: "3",
    ours: "Dry Parchment",
  },
  {
    id: "4",
    ours: "Green",
  },
  {
    id: "5",
  },
];

type Row = (typeof rows)[number];

const useCoffeeTermsColumns = (onDelete: (id: GridRowId) => void) =>
  useMemo<GridColDef<Row>[]>(
    () => [
      {
        headerName: "Our Words",
        field: "ours",
        flex: 1,
        sortable: false,
        renderCell: (params) =>
          params.row.ours || cellTextField(params, "State of Coffee"),
      },
      {
        headerName: "Your Words",
        field: "yours",
        flex: 1,
        sortable: false,
        editable: true,
        renderCell: cellTextField,
      },
      {
        headerName: "Sub-Types/Grades",
        field: "grades",
        flex: 1,
        sortable: false,
        renderCell: cellSelect,
      },
      {
        headerName: "Location(s)",
        field: "location",
        flex: 1,
        sortable: false,
        renderCell: cellSelect,
      },
      {
        field: "actions",
        type: "actions",
        flex: 1,
        maxWidth: 100,
        sortable: false,
        getActions: (params) => cellDeleteAction(params, onDelete),
      },
    ],
    [onDelete]
  );

const Tab = () => {
  const [currentRows, setCurrentRows] = useState(rows);
  const deleteRow = useCallback(
    (id: GridRowId) =>
      setCurrentRows((prev) => prev.filter((row) => row.id !== id)),
    []
  );
  const columns = useCoffeeTermsColumns(deleteRow);
  return (
    <Box>
      <Typography variant="h6" mb={3}>
        What terms would you prefer for each state of coffee?
      </Typography>
      <Section
        title="State of Coffee"
        headline="Customize terms pertinent to your operation"
        subheadline="Specify the relevant terms that should appear as dropdown options throughout the platform"
        example="e.g.  Our Words: Cherry; Your Words: Uva; Sub-Type/Grade: A1, A2 ; Location(s): Reception point, wet mill"
      >
        <DataGrid columns={columns} rows={currentRows} />
        <Button
          variant="text"
          startIcon={<Add />}
          sx={{ mt: 1 }}
          onClick={() =>
            setCurrentRows((prev) => [...prev, { id: Date.now().toString() }])
          }
        >
          New State Of Coffee
        </Button>
      </Section>
    </Box>
  );
};

export default Tab;
