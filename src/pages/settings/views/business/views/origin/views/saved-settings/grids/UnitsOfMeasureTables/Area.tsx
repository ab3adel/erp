import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";

const columns: GridColDef[] = [
  {
    headerName: "Quantity",
    field: "quantity",
    width: 88,
    sortable: false,
  },
  {
    headerName: "Your Unit of Measure",
    field: "uom",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Equivalent in Hectare (Ha)",
    field: "eq",
    flex: 1,
    sortable: false,
  },
];

const rows = [
  {
    id: 1,
    quantity: 1,
    uom: "Acre",
    eq: 0.405,
  },
];

const WeightTable = () => (
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
export default WeightTable;
