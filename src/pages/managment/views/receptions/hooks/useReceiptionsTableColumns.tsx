import { Chip, Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid-pro";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { AccountsEditSelect } from "../components/AccountsEditSelect";
import DateRangeContainer from "@/shared/components/dateRangePicker/DateRangeContainer";

type GroupedGridColumn = GridColDef & { group?: string };

export const useReceiptionsTableColumns = () => {
  const navigate = useNavigate();

  const columns: GroupedGridColumn[] = [
    {
      field: "receptionDate",
      headerName: "Reception Date",
      width: 180,
      group: "test",
      editable: false,
      renderCell: () => <DateRangeContainer />,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      group: "test 2",
      type: "singleSelect",
      valueOptions: ["pending", "approved"],
      renderCell: ({ value }) =>
        value ? (
          <Chip
            label={value}
            color={value === "pending" ? "warning" : "primary"}
          />
        ) : (
          <></>
        ),
      editable: true,
    },
    {
      field: "accountId",
      headerName: "Account ID",
      width: 150,
      renderEditCell: (props) => <AccountsEditSelect {...props} />,
      editable: true,
    },
    {
      field: "accountName",
      headerName: "Account Name",
      width: 150,
    },
    {
      field: "lotNumber",
      headerName: "Lot Number",
      group: "Lots Details",
      width: 150,
      type: "number",
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
      field: "grade",
      headerName: "Grade",
      width: 100,
      editable: true,
      group: "Lots Details",
    },
    {
      field: "weight",
      headerName: "Weight",
      group: "Sample Details",
      width: 100,
      editable: true,
      type: "number",
    },
    {
      field: "totalCost",
      headerName: "Total Cost",
      width: 150,
      type: "number",
      editable: true,
    },
    {
      field: "commission",
      headerName: "Commission",
      width: 100,
      type: "number",
      editable: true,
    },
    {
      field: "uom",
      headerName: "UoM",
      width: 100,
      editable: true,
      group: "Sample Details",
    },
    {
      field: "cherry_price",
      headerName: "Cherry Price",
      width: 100,
      type: "number",
      editable: true,
      group: "Sample Details",
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
