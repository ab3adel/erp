import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { DataGridPro, DataGridProProps } from "@mui/x-data-grid-pro";
import { FunctionComponent } from "react";
// import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { IAssignedRoles } from "@/shared/models/models";
import { generateAbbreviation } from "@/shared/utils/nameAbbreviationGenerator";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { capitalizeEachWord } from "@/shared/utils/capitalizeEachWord";
// import { generatePermissionText } from "@/shared/utils/PermissionTextGenerate";

interface TeamsRoleTableProps {
  onAddNewTeamMemberClick?: () => void;
  data: IAssignedRoles[];
}

const TeamsRoleTable: FunctionComponent<TeamsRoleTableProps> = (props) => {
  const { data, onAddNewTeamMemberClick } = props;

  // console.log(data);

  // const modulesOptions = [{}];

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
              {generateAbbreviation(row.entity.name)}
            </Avatar>
          </Box>
          <Box>
            <Typography color="text.primary" variant="body1">
              {row.entity.name}
            </Typography>
            <Typography color="text.secondary" variant="caption">
              {row.entity.email}
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
      renderCell: ({ row }) => row.modules,
    },
    {
      headerName: "Permissions",
      field: "permissions",
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => capitalizeEachWord(row.role),
    },
    {
      headerName: "Actions",
      field: "actions",
      flex: 1,
      maxWidth: 180,
      sortable: false,

      renderCell: ({ row }) =>
        row.role !== "owner" && (
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
      hideFooter
      rowHeight={70}
      disableColumnSelector
      disableColumnMenu
      disableColumnReorder
      disableRowSelectionOnClick
      columns={columns}
      rows={data}
    />
  );
};

export default TeamsRoleTable;
