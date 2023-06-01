import { GridColDef } from "@mui/x-data-grid-pro";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { Box, Typography, Link, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountRow } from "../types";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" , width : "100%" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
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
      headerName: "Name",
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
    { field: "type", headerName: "Type", width: 150, editable: true },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
      editable: true,
    },
    { field: "lastName", headerName: "Last Name", width: 150, editable: true },
    { field: "govId", headerName: "Gov ID", width: 150, editable: true },
    {
      field: "mobileNumber",
      headerName: "Mobile Number",
      width: 150,
      editable: true,
    },
    { field: "district", headerName: "District", width: 150, editable: true },
    {
      field: "completeness",
      headerName: "Completeness",
      width: 200,
      renderCell: ({ value }) => <LinearProgressWithLabel value={value} />,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
      renderCell: ({ value }) => (
        <Chip label={value} color="primary" variant="outlined" />
      ),
    },
  ];
  return columns;
};
