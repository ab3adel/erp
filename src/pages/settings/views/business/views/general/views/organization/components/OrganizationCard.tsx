import { FunctionComponent, ReactNode } from "react";
import {
  Box,
  Button,
  Paper,
  Chip,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import { DataGridPro, DataGridProProps } from "@mui/x-data-grid-pro";
import userPlusIcon from "@/assets/images/user-plus.svg";
import penIcon from "@/assets/images/pen.svg";
import buildingIcon from "@/assets/images/building-icon.svg";
import { IOrganization } from "@/shared/models/models";

interface OrganizationCardProps {
  data: IOrganization[];
  name: string;
  onEditClick?: () => void;
  onAddNewTeamMemberClick?: () => void;
  footer: ReactNode;
}

const OrganizationCard: FunctionComponent<OrganizationCardProps> = (props) => {
  const { data, name, onAddNewTeamMemberClick, onEditClick, footer } = props;

  const columns: DataGridProProps["columns"] = [
    { headerName: "City", field: "city", flex: 1, sortable: false },
    { headerName: "Currency", field: "currency", flex: 1, sortable: false },
    { headerName: "Language", field: "language", flex: 1, sortable: false },
    {
      headerName: "Team Members",
      field: "team_members",
      flex: 1,
      sortable: false,
    },
    {
      field: "plan",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Chip sx={{ minWidth: 40 }} label={params.value} />
      ),
    },
  ];

  return (
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
        hideFooter
        slots={{
          toolbar: () => (
            <Toolbar
              variant="dense"
              disableGutters
              sx={{ justifyContent: "space-between", mb: 3 }}
            >
              <Box display="flex" gap={2}>
                <img src={buildingIcon} width={20} />

                <Typography variant="body1">{name}</Typography>
              </Box>
              <IconButton onClick={onEditClick}>
                <img src={penIcon} alt="pen icon" />
              </IconButton>
            </Toolbar>
          ),
        }}
      />
      {footer}
    </Box>
  );
};

export default OrganizationCard;
