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
    headerName: "State of Coffee",
    field: "soc",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Equivalent in (L)",
    field: "eqL",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Equivalent in (Kg)",
    field: "eqKg",
    flex: 1,
    sortable: false,
  },
];

const rows = [
  {
    id: 1,
    quantity: 1,
    uom: "Saco",
    soc: "Uva",
    eqL: 4,
    eqKg: 2,
  },
  {
    id: 2,
    quantity: 1,
    uom: "Saco",
    soc: "Pergamino Mojado",
    eqL: 4,
    eqKg: 4,
},
{
    id: 3,
    quantity: 1,
    uom: "Saco",
    soc: "Pergamino Seco",
    eqL: 4,
    eqKg: 4,
},
{
    id: 4,
    quantity: 1,
    uom: "Saco",
    soc: "Verde",
    eqL: 4,
    eqKg: 6,
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
