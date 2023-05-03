import { Chip, Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const useReceiptionsTableColumns = () => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "receptionDate",
      headerName: "Reception Date",
      width: 180,
      type: "date",
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: ({ row }) => <Chip label={row.status} color="primary" />,
    },
    { field: "accountId", headerName: "Account ID", width: 150 },
    { field: "accountName", headerName: "Account Name", width: 150 },
    {
      field: "lotNumber",
      headerName: "Lot Number",
      width: 150,
      renderCell: ({ value }) => (
        <Link
          onClick={() => {
            navigate("/traceability?lotNumber=" + value);
          }}
        >
          {value}
        </Link>
      ),
    },
    { field: "grade", headerName: "Grade", width: 100 },
    { field: "weight", headerName: "Weight", width: 100 },
    { field: "totalCost", headerName: "Total Cost", width: 150 },
    {
      field: "payment",
      headerName: "Payment",
      width: 100,
      type: "boolean",
      renderCell: ({ value }) => {
        switch (value) {
          case true:
            return (
              <CheckCircleOutlineIcon
                sx={{ color: "success.main" }}
                fontSize="small"
              />
            );
          case false:
            return (
              <HighlightOffIcon sx={{ color: "error.main" }} fontSize="small" />
            );
        }
      },
    },
    {
      field: "commission",
      headerName: "Commission",
      width: 100,
    },
    {
      field: "uom",
      headerName: "UoM",
      width: 100,
    },
    {
      field: "cherry_price",
      headerName: "Cherry Price",
      width: 100,
    },
    {
      field: "currency_fixed",
      headerName: "Currency Fixed",
      width: 100,
    },
  ];
  return columns;
};
