import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";

const columns: GridColDef[] = [
  {
    headerName: "Certification",
    field: "cert",
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

const rows = [
  { id: "1", cert: "Fairtrade", code: "F", active: true },
  { id: "2", cert: "Organic", code: "O", active: true },
  { id: "3", cert: "C.A.F.E. Practices (Starbucks)", code: "C" },
  { id: "4", cert: "4C", code: "4" },
  { id: "5", cert: "Rainforest Alliance", code: "R" },
  { id: "6", cert: "Bird Friendly", code: "B" },
];

const CertificationsTable = () => (
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
export default CertificationsTable;
