import { Chip, Link, TextField } from "@mui/material";
import {
  GridColDef,
  GridFilterInputValue,
  GridFilterItem,
} from "@mui/x-data-grid-pro";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DateRangeContainer from "@/shared/components/dateRangePicker/DateRangeContainer";

type GroupedGridColumn = GridColDef & { group?: string };

export const useReceiptionsTableColumns = () => {
  const navigate = useNavigate();

  const columns: GroupedGridColumn[] = [
    {
      field: "reception_date",
      headerName: "Reception Date",
      width: 180,
      group: "test",
      editable: true,
      filterOperators: [
        {
          label: "is",
          value: "is",
          getApplyFilterFn: (filterItem: GridFilterItem) => {
            const filterValue = filterItem.value;
            return (params) => {
              const value = params.value as Date;
              return value.getTime() === filterValue.getTime();
            };
          },
          InputComponent: (props) => (
            <DateRangeContainer
              startdate={new Date()}
              endDate={null}
              hundleChangeDateFilter={props}
            />
          ),
        },
      ],
      renderEditCell: (props) => (
        <TextField
          value={props.value}
          placeholder={null}
          type="date"
          sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
          onChange={(e) =>
            props.api.setEditCellValue({
              value: e.currentTarget.value,
              id: props.id,
              field: props.field,
            })
          }
        />
      ),
      // renderCell: (params) => {
      //   return <DateRangeContainer startdate={params.value} endDate={null} />;
      // },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      group: "test 2",
      type: "singleSelect",
      valueOptions: ["pending", "approved", "inactive"],
      renderCell: ({ value }) =>
        value ? (
          <Chip
            label={value}
            color={
              value === "pending"
                ? "warning"
                : value === "inactive"
                ? "error"
                : "success"
            }
            sx={{ textTransform: "capitalize" }}
          />
        ) : (
          <></>
        ),
      editable: false,
    },
    {
      field: "account_id",
      headerName: "Account ID",
      width: 150,
      editable: false,
    },
    {
      field: "account_name",
      headerName: "Account Name",
      width: 150,
    },
    {
      field: "lot_number",
      headerName: "Lot Number",
      group: "Lots Details",
      width: 150,
      type: "text",
      renderCell: ({ value }) => (
        <Link
          textTransform="uppercase"
          onClick={() => {
            navigate("/traceability?lotNumber=" + value);
          }}
        >
          {value}
        </Link>
      ),
      editable: false,
    },
    {
      field: "is_paid",
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
              <HighlightOffIcon sx={{ color: "#F57C00" }} fontSize="small" />
            );
          default:
            return (
              <HighlightOffIcon sx={{ color: "#F57C00" }} fontSize="small" />
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
      type: "singleSelect",
      valueOptions: ["A", "B", "C"],
      group: "Lots Details",
      filterOperators: [
        {
          label: "equals",
          value: "equals",
          getApplyFilterFn: (filterItem: GridFilterItem) => {
            return filterItem.value;
          },
          InputComponent: GridFilterInputValue,
          InputComponentProps: { type: "string" },
        },
      ],
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
      field: "total_price",
      headerName: "Total Cost",
      width: 150,
      type: "number",
      editable: false,
    },
    {
      field: "commission_uom",
      headerName: "Commission",
      width: 100,
      type: "number",
      editable: true,
    },
    {
      field: "cost_per_uom",
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
      editable: false,
      group: "Sample Details",
    },
    {
      field: "currency_fixed",
      headerName: "Currency Fixed",
      width: 100,
      editable: false,
    },
  ];
  return columns;
};
