import { useCallback, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import Section from "../../../components/Section";
import DataGrid, {
  cellCheckBox,
  cellDeleteAction,
  cellSelect,
} from "../components/EditableDatagrid";
import { GridColDef, GridRowId } from "@mui/x-data-grid-pro";

const rows = [
  {
    id: "1",
    l: "Reception Point",
    sl: ["Rugali", "Cyesha"],
    pm: ["Natural", "Honey"],
  },
  { id: "2", l: "(user) Location 2", sl: [], pm: [] },
  { id: "3", l: "(user) Location 3", sl: [], pm: [] },
  { id: "4", l: "(user) Location 4", sl: [], pm: [] },
  { id: "5", l: "(user) Location 5", sl: [], pm: [] },
  { id: "6", l: "(user) Location 6", sl: [], pm: [] },
  { id: "7", l: "(user) Location 7", sl: [], pm: [] },
  { id: "8", l: "(user) Location 8", sl: [], pm: [] },
];

type Row = (typeof rows)[number];

const useLocationColumns = (onDelete: (id: GridRowId) => void) =>
  useMemo<GridColDef<Row>[]>(
    () => [
      {
        headerName: "Location",
        field: "l",
        width: 147,
        sortable: false,
      },
      {
        headerName: "Sub-Locations",
        field: "sl",
        flex: 1,
        sortable: false,
        renderCell: (params) =>
          cellSelect(params, "Select Sub-Locations", {
            options: ["Rugali", "Cyesha"],
            multiple: true,
          }),
      },
      {
        headerName: "Account Type",
        field: "at",
        flex: 1,
        sortable: false,
        renderCell: (params) =>
          cellSelect(params, "Select Option", {
            options: [
              "Farmer",
              "Agent",
              "Processing Facility",
              "Buyer",
              "Plot",
            ],
          }),
      },
      {
        headerName: "Processing Method",
        field: "pm",
        flex: 1,
        sortable: false,
        renderCell: (params) =>
          cellSelect(params, "Enter Your Words", {
            options: ["Natural", "Honey"],
            multiple: true,
          }),
      },
      {
        headerName: "Release Inventory",
        field: "ri",
        flex: 1,
        sortable: false,
        type: "boolean",
        renderCell: cellCheckBox,
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
  const columns = useLocationColumns(deleteRow);
  return (
    <Box>
      <Typography variant="h6" mb={3}>
        Which actions are performed in each location?
      </Typography>
      <Section
        title="Actions by Location"
        headline="Locations details"
        subheadline="Specify account type, sub-locations and processing methods for each location."
      >
        <DataGrid columns={columns} rows={currentRows} />
      </Section>
    </Box>
  );
};

export default Tab;
