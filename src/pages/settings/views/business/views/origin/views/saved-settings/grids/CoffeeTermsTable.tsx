import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";

const columns: GridColDef[] = [
  {
    headerName: "Our Words",
    field: "ours",
    sortable: false,
    flex: 2,
  },
  {
    headerName: "Your Words",
    field: "yours",
    sortable: false,
    flex: 2,
  },
  {
    headerName: "Sub-Type/Grade",
    field: "grade",
    sortable: false,
    flex: 3,
    valueFormatter: (params) => params.value.join(", "),
  },
  {
    headerName: "Locations",
    field: "locations",
    sortable: false,
    flex: 3,
    valueFormatter: (params) => params.value.join(", "),
  },
];

const rows = [
  {
    id: 1,
    ours: "Cherry",
    yours: "Uva",
    grade: ["A", "B"],
    locations: ["Reception Point", "Wet Mill"],
  },
  {
    id: 2,
    ours: "Wet Parchment",
    yours: "Pergamino",
    grade: ["A1", "A2", "A3", "A4"],
    locations: ["Wet Mill", "Fermentation Tanks"],
  },
  {
    id: 3,
    ours: "Dry Parchment",
    yours: "Pergamino Seco",
    grade: ["A1", "A2", "A3", "A4"],
    locations: ["Drying Beds", "Storage"],
  },
  {
    id: 4,
    ours: "Green",
    yours: "Verde",
    grade: ["14/15", "16+", "17/18", "Triage", "15+", "13/14", "+1"],
    locations: ["Dry Mill", "Storage"],
  },
];

const CoffeeTermsTable = () => (
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
export default CoffeeTermsTable;
