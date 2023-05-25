import { GridColDef } from "@mui/x-data-grid-pro";
import { Chip } from "@mui/material";

export const useLotDataGridColumns = () => {
  const columns: GridColDef[] = [
    { field: "lastUpdate", headerName: "Last Update", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: () => (
        <Chip color="success" variant="outlined" label="Approved" />
      ),
    },
    { field: "state", headerName: "State", width: 150 },
    { field: "name", headerName: "Lot Name", width: 150 },
    { field: "weight", headerName: "Weight", width: 150 },
    { field: "uom", headerName: "UOM", width: 150 },
    { field: "grade", headerName: "Grade", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "subLocation", headerName: "Sub Location", width: 150 },
    { field: "processType", headerName: "Process Type", width: 150 },
  ];
  return columns;
};
