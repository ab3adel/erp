import dayjs from "dayjs";
import { uniqueId } from "lodash";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { useOriginSettingGetter } from "../../../hooks/states";

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
    valueFormatter: (params) => params.value.format("ll"),
  },
  {
    headerName: "End",
    field: "end",
    flex: 1,
    sortable: false,
    valueFormatter: (params) => params.value.format("ll"),
  },
  {
    headerName: "Show in Inventory",
    field: "show_in_inventory",
    flex: 1,
    sortable: false,
    renderCell: (params) => (params.value ? "Yes" : "No"),
  },
];

const HarvestSeasonsTable = () => {
  const rows = useOriginSettingGetter(
    "harvest_seasons",
    "main",
    (payload: Record<string, any>[]) =>
      payload?.map((row) => ({
        ...row,
        id: uniqueId(),
        start: dayjs(row.start),
        end: dayjs(row.end),
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
export default HarvestSeasonsTable;
