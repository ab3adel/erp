import { GridColDef } from "@mui/x-data-grid-pro";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { Box, Typography, Link, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountRow } from "../types";
import { AccountTypesEditSelect } from "../components/AccountTypesEditSelect";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  let color:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";

  if (props.value < 30) {
    color = "error";
  } else if (props.value > 30 && props.value <= 70) {
    color = "warning";
  } else {
    color = "success";
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} color={color} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export const useAccountsTableColumns = () => {
  const navigate = useNavigate();

  const columns: GridColDef<AccountRow>[] = [
    {
      field: "name",
      headerName: "Account Name",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <Link
          sx={{
            textDecoration: "none",
            color: "primary.main",
          }}
          onClick={() =>
            navigate(`/${params.id}/${params.row?.type?.toLowerCase()}-profile`)
          }
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "id",
      headerName: "Account ID",
      width: 150,
    },
    {
      field: "type",
      headerName: "Account Type",
      width: 150,
      editable: true,
      renderEditCell: (props) => <AccountTypesEditSelect {...props} />,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
      editable: true,
    },
    { field: "lastName", headerName: "Last Name", width: 150, editable: true },
    { field: "govId", headerName: "Goverment ID", width: 150, editable: true },
    {
      field: "mobileNumber",
      headerName: "Mobile Number",
      width: 150,
      editable: true,
      valueGetter: ({ value }) => value || "+252 1233134",
    },
    { field: "district", headerName: "District", width: 150, editable: true },
    {
      field: "address1",
      headerName: "Address 1",
      width: 150,
      editable: true,
    },

    {
      field: "status",
      headerName: "Status",
      type: "singleSelect",
      width: 150,
      editable: true,
      renderCell: ({ value }) => {
        let color:
          | "primary"
          | "success"
          | "error"
          | "warning"
          | "info"
          | "default"
          | "secondary" = "primary";
        switch (value) {
          case "active": {
            color = "success";
            break;
          }
          case "inactive": {
            color = "error";
            break;
          }
          case "pending": {
            color = "warning";
            break;
          }
          case "archived": {
            color = "info";
            break;
          }
          default: {
            color = "primary";
            break;
          }
        }
        return <Chip label={value} color={color} />;
      },
      valueOptions: ["active", "inactive", "pending", "archived"],
    },
    {
      field: "completeness",
      headerName: "Completeness",
      type: "number",
      editable: true,
      width: 200,
      renderCell: ({ value }) => <LinearProgressWithLabel value={value || 0} />,
    },
  ];
  return columns;
};
