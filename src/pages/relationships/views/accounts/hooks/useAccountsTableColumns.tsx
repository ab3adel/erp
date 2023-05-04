import { GridColDef } from "@mui/x-data-grid";
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
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "govId", headerName: "Gov ID", width: 150 },
    { field: "mobileNumber", headerName: "Mobile Number", width: 150 },
    { field: "district", headerName: "District", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "completeness",
      headerName: "Completeness",
      width: 150,
      renderCell: ({ value }) => <LinearProgressWithLabel value={value} />,
    },
  ];
  return columns;
};
