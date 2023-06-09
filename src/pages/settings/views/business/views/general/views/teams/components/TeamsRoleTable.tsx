import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { DataGridPro, DataGridProProps } from "@mui/x-data-grid-pro";
import { FunctionComponent } from "react";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { IAssignedRoles } from "@/shared/models/models";
import { generateAbbreviation } from "@/shared/utils/nameAbbreviationGenerator";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

interface TeamsRoleTableProps {
  onAddNewTeamMemberClick?: () => void;
  data: IAssignedRoles[];
}

const TeamsRoleTable: FunctionComponent<TeamsRoleTableProps> = (props) => {
  const { data, onAddNewTeamMemberClick } = props;

  const modulesOptions = [{}];

  const columns: DataGridProProps<IAssignedRoles>["columns"] = [
    {
      headerName: "Full Name",
      field: "info",
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => (
        <Box display="flex" gap={1} alignItems="center">
          <Box>
            <Avatar style={{ width: 32, height: 32 }}>
              {generateAbbreviation("Jane Doe")}
            </Avatar>
          </Box>
          <Box>
            <Typography color="text.primary" variant="body1">
              Jane Doe
            </Typography>
            <Typography color="text.secondary" variant="caption">
              jane@longmilescoffee.com
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      headerName: "Module Access",
      flex: 1,
      field: "modules",
      sortable: false,
      renderCell: () => "All Modules",
    },
    {
      headerName: "Permissions",
      field: "permissions",
      flex: 1,
      sortable: false,
      renderCell: () => "Owner",
    },
    {
      headerName: "Actions",
      field: "actions",
      flex: 1,
      maxWidth: 180,
      sortable: false,
      renderCell: () => (
        <Box width="100%" display="flex" justifyContent="space-between">
          <IconButton>
            <CreateOutlinedIcon />
          </IconButton>
          <IconButton>
            <PersonOffOutlinedIcon />
          </IconButton>
          <IconButton>
            <PersonRemoveOutlinedIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <DataGridPro
      rowHeight={70}
      disableColumnSelector
      disableColumnMenu
      disableColumnReorder
      disableRowSelectionOnClick
      columns={columns}
      rows={data}
      slots={{
        footer: () => (
          <Box pt={2}>
            <Button
              onClick={onAddNewTeamMemberClick}
              variant="outlined"
              startIcon={<PersonAddOutlinedIcon />}
            >
              new team member
            </Button>
          </Box>
        ),
      }}
    />
  );
};

export default TeamsRoleTable;
