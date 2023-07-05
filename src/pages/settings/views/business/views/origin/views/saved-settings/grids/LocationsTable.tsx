import { uniqueId } from "lodash";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { useOriginSettingGetter } from "../../../hooks/states";

const columns: GridColDef[] = [
  {
    headerName: "Location",
    field: "location",
    sortable: false,
  },
  {
    headerName: "Account Type",
    field: "category",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Sub-Locations",
    field: "sub_locations",
    flex: 1,
    sortable: false,
    valueFormatter: (params) => params.value?.join(", ")
  },
  {
    headerName: "Processing Method",
    field: "process_methods",
    flex: 1,
    sortable: false,
    valueFormatter: (params) => params.value?.join(", ")
  },
  {
    headerName: "Release Inventory",
    field: "release_inventory",
    flex: 1,
    sortable: false,
    type: "boolean",
    renderCell: (params) => (params.value ? "Yes" : "No"),
  },
];

const LocationsTable = () => {
  const rows = useOriginSettingGetter(
    "locations",
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
export default LocationsTable;
