import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";

const columns: GridColDef[] = [
  {
    headerName: "Our Words",
    field: "ours",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Your Words",
    field: "yours",
    flex: 1,
    sortable: false,
  },
];

const rows = [
  { id: 1, ours: "Farmer", yours: "Source" },
  { id: 2, ours: "Agent", yours: "Scout" },
  { id: 3, ours: "Processing Facility", yours: "Wet Mill" },
  { id: 3, ours: "Processing Facility", yours: "Dry Mill" },
  { id: 4, ours: "Buyer", yours: "Exporter" },
];

const AccountTypesTable = () => (
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
export default AccountTypesTable;
