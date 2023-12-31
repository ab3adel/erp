import {
  Avatar,
  Box,
  ButtonBase,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGridPro, DataGridProProps } from "@mui/x-data-grid-pro";
import { FunctionComponent, useMemo } from "react";
import { IAssignedRoles } from "@/shared/models/models";
import { generateAbbreviation } from "@/shared/utils/nameAbbreviationGenerator";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { capitalizeEachWord } from "@/shared/utils/capitalizeEachWord";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

interface TeamsRoleTableProps {
  data?: IAssignedRoles[];
  onDeleteClick?: (id: number) => void;
  onDeactivivateClick?: (id: number) => void;
  onActivateClick?: (id: number) => void;
  onEditClick?: (id: number) => void;
  disableActivateButton?: boolean;
  onModuleClick?: (module: string, id: number) => void;
}

const TeamsRoleTable: FunctionComponent<TeamsRoleTableProps> = (props) => {
  const {
    data,
    onDeleteClick,
    onDeactivivateClick,
    onEditClick,
    onActivateClick,
    disableActivateButton,
    onModuleClick,
  } = props;

  const columns: DataGridProProps<IAssignedRoles>["columns"] = useMemo(
    () => [
      {
        headerName: "Full Name",
        field: "info",
        flex: 1,
        sortable: false,
        renderCell: ({ row }) => (
          <Box display="flex" gap={1} alignItems="center">
            <Box>
              <Avatar
                sx={(theme) => ({
                  bgcolor: row.entity.is_active
                    ? undefined
                    : theme.palette.action.disabled,
                })}
                style={{ width: 32, height: 32 }}
              >
                {generateAbbreviation(row.entity.name)}
              </Avatar>
            </Box>
            <Box>
              <Typography
                color={row.entity.is_active ? "text.primary" : "text.disabled"}
                variant="body1"
              >
                {row.entity.name}
              </Typography>
              <Typography
                color={
                  row.entity.is_active ? "text.secondary" : "text.disabled"
                }
                variant="caption"
              >
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
        renderCell: ({ row }) => (
          <Stack direction="row" spacing={2} alignItems="center">
            {row.modules.map((item) => (
              <ButtonBase
                disabled={row.role === "owner" || !row.entity.is_active}
                onClick={() => onModuleClick?.(item.name, row.id)}
              >
                <Avatar
                  sx={(theme) => ({
                    width: 32,
                    height: 32,
                    bgcolor: row.entity.is_active
                      ? theme.palette.action.selected
                      : theme.palette.action.disabledBackground,
                  })}
                >
                  <img src={item.src} alt={item.name} width={17} />
                </Avatar>
              </ButtonBase>
            ))}
          </Stack>
        ),
      },
      {
        headerName: "Permissions",
        field: "permissions",
        flex: 1,
        sortable: false,

        renderCell: ({ row }) => (
          <Typography
            color={row.entity.is_active ? "text.primary" : "text.disabled"}
          >
            {capitalizeEachWord(row.role)}
          </Typography>
        ),
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
              <Tooltip title="Edit Member">
                <IconButton
                  onClick={() => onEditClick?.(row.id)}
                  disabled={!row.entity.is_active}
                >
                  <CreateOutlinedIcon />
                </IconButton>
              </Tooltip>

              {row.entity.is_active ? (
                <Tooltip title="Deactivate Member">
                  <IconButton onClick={() => onDeactivivateClick?.(row.id)}>
                    <PersonOffOutlinedIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Activate Member">
                  <IconButton
                    disabled={disableActivateButton}
                    onClick={() => onActivateClick?.(row.id)}
                  >
                    <PersonOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Delete Member">
                <IconButton
                  disabled={!row.entity.is_active}
                  onClick={() => onDeleteClick?.(row.id)}
                >
                  <PersonRemoveOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          ),
      },
    ],
    [
      disableActivateButton,
      onActivateClick,
      onDeactivivateClick,
      onDeleteClick,
      onEditClick,
      onModuleClick,
    ]
  );

  const gridData = useMemo(() => data ?? [], [data]);

  return data ? (
    <DataGridPro
      rowHeight={70}
      disableColumnSelector
      pagination
      initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      pageSizeOptions={[10]}
      disableColumnMenu
      disableColumnReorder
      disableRowSelectionOnClick
      columns={columns}
      rows={gridData}
    />
  ) : (
    <></>
  );
};

export default TeamsRoleTable;
