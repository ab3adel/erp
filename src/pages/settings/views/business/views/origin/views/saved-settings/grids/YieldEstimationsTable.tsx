import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";

const columns: GridColDef[] = [
  {
    headerName: "Process Method",
    field: "pm",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Cherry to Wet %",
    field: "ctw",
    flex: 1,
    sortable: false,
    align: "center",
  },
  {
    headerName: "Wet to Dry %",
    field: "wtd",
    flex: 1,
    sortable: false,
    align: "center",
  },
  {
    headerName: "Dry to Green %",
    field: "dtg",
    flex: 1,
    sortable: false,
    align: "center",
},
{
    headerName: "Total %",
    field: "total",
    flex: 1,
    sortable: false,
    align: "center",
    // valueGetter: ({ row }) => (row.ctw * row.wtd * row.dtg) / 10e4,
  },
];

const rows = [
  { id: 1, pm: "Natural", ctw: 100, wtd: 40, dtg: 40, total: 16 },
  { id: 2, pm: "Honey", ctw: 80, wtd: 60, dtg: 60, total: 17 },
  { id: 3, pm: "Fully Washed", ctw: 75, wtd: 55, dtg: 60, total: 25 },
  { id: 4, pm: "Experimental-Washed", ctw: 75, wtd: 55, dtg: 60, total: 25 },
  { id: 5, pm: "Experimental-Natural", ctw: 100, wtd: 40, dtg: 40, total: 16 },
];

const YieldEstimationsTable = () => (
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
export default YieldEstimationsTable;
