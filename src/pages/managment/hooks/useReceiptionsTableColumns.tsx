import { Chip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

export const useReceiptionsTableColumns = () => {
  const columns: GridColDef[] = [
    { field: "receptionDate", headerName: "Reception Date", width: 180 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => (
        <Chip label={row.status} variant="outlined" color="error" />
      ),
    },
    { field: "accountId", headerName: "Account ID", flex: 1 },
    { field: "accountName", headerName: "Account Name", flex: 1 },
    { field: "lotNumber", headerName: "Lot Number", flex: 1 },
    { field: "grade", headerName: "Grade", flex: 1 },
    { field: "weight", headerName: "Weight", flex: 1 },
    { field: "totalCost", headerName: "Total Cost", flex: 1 },
    { field: "payment", headerName: "Payment", flex: 1 },
  ];
  return columns;
};
