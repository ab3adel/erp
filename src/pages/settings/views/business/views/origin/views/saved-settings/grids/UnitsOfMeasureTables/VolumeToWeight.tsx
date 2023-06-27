import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { uniqueId } from "lodash";
import { useOriginSettingGetter } from "../../../../hooks/states";

const columns: GridColDef[] = [
  {
    headerName: "Quantity",
    field: "quantity",
    width: 88,
    sortable: false,
    valueGetter: () => 1,
  },
  {
    headerName: "Your Unit of Measure",
    field: "uom",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "State of Coffee",
    field: "coffee_state",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Equivalent in (L)",
    field: "toL",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Equivalent in (Kg)",
    field: "toKg",
    flex: 1,
    sortable: false,
  },
];

const WeightTable = () => {
  const rows = useOriginSettingGetter(
    "uom",
    "LtoKg",
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
export default WeightTable;
