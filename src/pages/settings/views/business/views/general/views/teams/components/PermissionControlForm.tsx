import { Permissions } from "@/shared/enums/Permissions";
import { modulesImages } from "@/shared/enums/modules-images";
import { Paper, Box, Switch, Typography, Radio } from "@mui/material";
import { DataGridPro, DataGridProProps } from "@mui/x-data-grid-pro";
import { FunctionComponent } from "react";

interface PermissionControlFormProps {}

interface IPermissionData {
  section: string;
  value: Permissions;
  id: number;
}

const PermissionControlForm: FunctionComponent<
  PermissionControlFormProps
> = () => {
  const data = [
    { section: "Management", value: Permissions.Hide, id: 1 },
    { section: "Management Actions", value: Permissions.ReadWrite, id: 2 },
  ];

  const columns: DataGridProProps<IPermissionData>["columns"] = [
    {
      headerName: "Section",
      field: "section",
      flex: 1,
      sortable: false,
    },
    {
      headerName: "Hide",
      field: "hide",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (props) => (
        <Radio checked={props.row.value === Permissions.Hide} />
      ),
    },
    {
      headerName: "Read",
      field: "read",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (props) => (
        <Radio checked={props.row.value === Permissions.Read} />
      ),
    },
    {
      headerName: "Read & Write",
      field: "read_write",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (props) => (
        <Radio checked={props.row.value === Permissions.ReadWrite} />
      ),
    },
    {
      headerName: "Read, Write & Delete",
      field: "read_write_delete",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (props) => (
        <Radio checked={props.row.value === Permissions.ReadWriteDelete} />
      ),
    },
  ];

  return (
    <Box component={Paper} variant="outlined" p={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={2}>
          <img src={modulesImages.CoffeeManagment} />
          <Typography variant="body1" color="text.primary">
            Coffee Management
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Switch />
          <Typography variant="body1" color="text.secondary" fontWeight={400}>
            Show
          </Typography>
        </Box>
      </Box>
      <Box mt={2}>
        <DataGridPro
          hideFooter
          style={{ textAlign: "center" }}
          disableColumnSelector
          disableColumnMenu
          disableColumnReorder
          disableRowSelectionOnClick
          columns={columns}
          rows={data}
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "transparent !important",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PermissionControlForm;
