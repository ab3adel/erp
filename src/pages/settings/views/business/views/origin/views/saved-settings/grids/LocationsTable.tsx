import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";

const columns: GridColDef[] = [
  {
    headerName: "Location",
    field: "l",
    sortable: false,
  },
  {
    headerName: "Account Type",
    field: "at",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Sub-Locations",
    field: "sl",
    flex: 1,
    sortable: false,
    valueFormatter: (params) => params.value.join(", ")
  },
  {
    headerName: "Processing Method",
    field: "pm",
    flex: 1,
    sortable: false,
    valueFormatter: (params) => params.value.join(", ")
  },
  {
    headerName: "Release Inventory",
    field: "ri",
    flex: 1,
    sortable: false,
    type: "boolean",
    renderCell: (params) => (params.value ? "Yes" : "No"),
  },
];

const rows = [
  {
    id: "1",
    at: "Agent",
    l: "Reception Point",
    sl: ["Rugali", "Cyesha", "Kilimbi", "+1"],
    pm: [],
  },
  {
    id: "2",
    at: "Processing Facility",
    l: "(user) Location 2",
    sl: ["Rugali", "Cyesha", "Kilimbi", "+2"],
    pm: ["Natural", "Honey", "Washed"],
  },
  {
    id: "3",
    at: "Processing Facility",
    l: "(user) Location 3",
    sl: ["Raised Bed1", "+3"],
    pm: ["Natural", "Honey", "Washed", "+1"],
  },
  {
    id: "4",
    at: "Processing Facility",
    l: "(user) Location 4",
    sl: [],
    pm: ["Natural", "Honey", "Washed", "+2"],
  },
  {
    id: "5",
    at: "Processing Facility",
    l: "(user) Location 5",
    sl: [],
    pm: ["Natural", "Honey", "Washed", "+2"],
    ri: true,
  },
  {
    id: "6",
    at: "Processing Facility",
    l: "(user) Location 6",
    sl: ["Warehouse 1", "Warehouse 2"],
    pm: ["Natural", "Honey", "Washed", "+2"],
    ri: true,
  },
];

const LocationsTable = () => (
  <DataGridPro
    sx={{
      overflowX: "scroll",
      "& .MuiDataGrid-row:last-child > *": {
        border: "none",
      },
    }}
    rowHeight={80}
    columns={columns}
    disableRowSelectionOnClick
    hideFooter
    rows={rows}
  />
);
export default LocationsTable;
