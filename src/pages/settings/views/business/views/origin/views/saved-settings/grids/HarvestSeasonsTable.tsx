import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import dayjs from "dayjs";

const columns: GridColDef[] = [
  {
    headerName: "Name",
    field: "name",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Start",
    field: "start",
    flex: 1,
    sortable: false,
    valueFormatter: (params) => params.value.format('ll')
  },
  {
    headerName: "End",
    field: "end",
    flex: 1,
    sortable: false,
    valueFormatter: (params) => params.value.format('ll')
  },
  {
    headerName: "Show in Inventory",
    field: "inv",
    flex: 1,
    sortable: false,
    renderCell: (params) => (params.value ? "Yes" : "No"),
  },
];

const rows = [
  {
    id: 1,
    name: "2022 Harvest",
    start: dayjs("2022-02-01"),
    end: dayjs("2022-06-01"),
    inv: true,
  },
  {
    id: 2,
    name: "2022 Harvest",
    start: dayjs("2023-02-01"),
    end: dayjs("2023-06-01"),
    inv: true,
  },
];

const HarvestSeasonsTable = () => (
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
export default HarvestSeasonsTable;
