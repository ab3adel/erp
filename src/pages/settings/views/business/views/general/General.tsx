import {
  Box,
  Button,
  Paper,
  Chip,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import plusIcon from "@/assets/images/plus-icon.svg";
import { DataGridPro, DataGridProProps } from "@mui/x-data-grid-pro";
import userPlusIcon from "@/assets/images/user-plus.svg";
import penIcon from "@/assets/images/pen.svg";
import buildingIcon from "@/assets/images/building-icon.svg";

const Bussniess = () => {
  const columns: DataGridProProps["columns"] = [
    { headerName: "City", field: "city", flex: 1, sortable: false },
    { headerName: "Currency", field: "currency", flex: 1, sortable: false },
    { headerName: "Language", field: "language", flex: 1, sortable: false },
    { headerName: "Team Members", field: "members", flex: 1, sortable: false },
    {
      headerName: "Plan",
      field: "plan",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Chip sx={{ minWidth: 40 }} label={params.value} />
      ),
    },
  ];

  const data = [
    {
      id: 1,
      city: "New York",
      currency: "USD",
      language: "English",
      members: 10,
      plan: "Pro",
    },
  ];

  return (
    <Box mx="24px" pb={3}>
      <Box py={3} display="flex" justifyContent="flex-end">
        <Button disableElevation={false} startIcon={<img src={plusIcon} />}>
          new organization
        </Button>
      </Box>

      <Box component={Paper} variant="outlined" p={2} overflow="hidden">
        <DataGridPro
          disableColumnSelector
          disableColumnMenu
          disableColumnReorder
          disableRowSelectionOnClick
          columns={columns}
          rows={data}
          getRowClassName={() => ""}
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "transparent !important",
            },
          }}
          slots={{
            toolbar: () => (
              <Toolbar
                variant="dense"
                disableGutters
                sx={{ justifyContent: "space-between", mb: 3 }}
              >
                <Box display="flex" gap={2}>
                  <img src={buildingIcon} width={20} />
                  <Typography variant="body1">Long Miles Burundi</Typography>
                </Box>
                <IconButton>
                  <img src={penIcon} alt="pen icon" />
                </IconButton>
              </Toolbar>
            ),
            footer: () => (
              <Box pt={2}>
                <Button
                  variant="outlined"
                  startIcon={<img src={userPlusIcon} />}
                >
                  new team member
                </Button>
              </Box>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Bussniess;
