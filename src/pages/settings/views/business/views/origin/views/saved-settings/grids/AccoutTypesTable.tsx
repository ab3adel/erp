import { uniqueId } from "lodash";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { useOriginSettingGetter } from "../../../hooks/states";

const columns: GridColDef[] = [
  {
    headerName: "Our Words",
    field: "category",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Your Words",
    field: "account_type",
    flex: 1,
    sortable: false,
  },
];

const AccountTypesTable = () => {
  const rows = useOriginSettingGetter(
    "account_types",
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
export default AccountTypesTable;
