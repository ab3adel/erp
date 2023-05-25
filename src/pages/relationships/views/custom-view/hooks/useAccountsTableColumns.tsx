import { GridColDef } from "@mui/x-data-grid-pro";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { Box, Typography } from "@mui/material";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
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
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 150, editable: true },
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
    { field: "status", headerName: "Status", width: 150, editable: true },
    {
      field: "completeness",
      headerName: "Completeness",
      width: 150,
      renderCell: ({ value }) => <LinearProgressWithLabel value={value} />,
    },
  ];
  return columns;
};
