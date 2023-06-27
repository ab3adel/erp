import { uniqueId } from "lodash";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { useOriginSettingGetter } from "../../../hooks/states";

const columns: GridColDef[] = [
  {
    headerName: "Process Method",
    field: "process_method",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Cherry to Wet %",
    field: "cherry_to_wet",
    flex: 1,
    sortable: false,
    align: "center",
  },
  {
    headerName: "Wet to Dry %",
    field: "wet_to_dry",
    flex: 1,
    sortable: false,
    align: "center",
  },
  {
    headerName: "Dry to Green %",
    field: "dry_to_green",
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

const YieldEstimationsTable = () => {
  const rows = useOriginSettingGetter(
    "yield_estimations",
    "main",
    (payload: Record<string, any>[]) =>
      payload?.map((row) => ({
        ...row,
        id: uniqueId(),
      }))
  );

  return (
    <DataGridPro
      sx={{
        overflowX: "scroll",
        "& .MuiDataGrid-row:last-child > *": {
          border: "none",
        },
      }}
      autoHeight
      rowHeight={80}
      columns={columns}
      disableRowSelectionOnClick
      hideFooter
      rows={rows ?? []}
    />
  );
};
export default YieldEstimationsTable;
