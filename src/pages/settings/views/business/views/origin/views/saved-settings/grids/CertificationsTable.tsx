import { uniqueId } from "lodash";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { useOriginSettingGetter } from "../../../hooks/states";

const columns: GridColDef[] = [
  {
    headerName: "Certification",
    field: "name",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Whatsapp Code",
    field: "code",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Active",
    field: "active",
    flex: 1,
    sortable: false,
    renderCell: (params) => (params.value ? "Yes" : "No"),
  },
];

const CertificationsTable = () => {
  const rows = useOriginSettingGetter(
    "tenant",
    "certifications",
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
export default CertificationsTable;
