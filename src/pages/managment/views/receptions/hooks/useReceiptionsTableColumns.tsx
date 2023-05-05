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
      type: "singleSelect",
      valueOptions: ["pending", "approved"],
      renderCell: ({ value }) =>
        value ? <Chip label={value} color="primary" /> : <></>,
      editable: true,
    },
    {
      field: "accountId",
      headerName: "Account ID",
      width: 150,
      editable: true,
    },
    {
      field: "accountName",
      headerName: "Account Name",
      width: 150,
      editable: true,
    },
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
      editable: true,
    },
    {
      field: "grade",
      headerName: "Grade",
      width: 100,
      editable: true,
    },
    {
      field: "weight",
      headerName: "Weight",
      width: 100,
      editable: true,
    },
    {
      field: "totalCost",
      headerName: "Total Cost",
      width: 150,
      editable: true,
    },
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
          default:
            return (
              <HighlightOffIcon sx={{ color: "error.main" }} fontSize="small" />
            );
        }
      },
      editable: true,
    },
    {
      field: "commission",
      headerName: "Commission",
      width: 100,
      editable: true,
    },
    {
      field: "uom",
      headerName: "UoM",
      width: 100,
      editable: true,
    },
    {
      field: "cherry_price",
      headerName: "Cherry Price",
      width: 100,
      editable: true,
    },
    {
      field: "currency_fixed",
      headerName: "Currency Fixed",
      width: 100,
      editable: true,
    },
  ];
  return columns;
};
