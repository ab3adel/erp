import { modulesImages } from "@/shared/enums/modules-images";
import { Paper, Box, Switch, Typography, SwitchProps } from "@mui/material";
import { DataGridPro, DataGridProProps } from "@mui/x-data-grid-pro";
import { FunctionComponent } from "react";
import { Abilities } from "../hooks/useAbilities";
import { capitalizeEachWord } from "@/shared/utils/capitalizeEachWord";
import { groupBy } from "lodash";
import PermissionRadioButton from "./PermissionRadioButton";

export interface OutputValue {
  subcategory: string;
  abilities: string[];
}

export interface PermissionControlFormProps {
  abilities: Abilities[];
  category: string;
  onChange?: (value: OutputValue) => void;
  value: string[];
  showButtonProps?: SwitchProps;
  showPanel?: boolean;
}

const PermissionControlForm: FunctionComponent<PermissionControlFormProps> = (
  props
) => {
  const { abilities, category, onChange, value, showButtonProps, showPanel } =
    props;

  const groupedAbilitesBySubcategory = groupBy(
    abilities,
    (item) => item.subcategory
  );

  const columns: DataGridProProps<[string, Abilities[]]>["columns"] = [
    {
      headerName: "Section",
      field: "subcategory",
      flex: 1,
      sortable: false,
      renderCell: (props) => capitalizeEachWord(props.row[0]),
    },
    {
      headerName: "Hide",
      field: "hide",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (props) => (
        <PermissionRadioButton
          onChange={onChange}
          value={value}
          rowProps={props}
          targetActions={[]}
        />
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
        <PermissionRadioButton
          onChange={onChange}
          value={value}
          rowProps={props}
          targetActions={["read"]}
        />
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
        <PermissionRadioButton
          onChange={onChange}
          value={value}
          rowProps={props}
          targetActions={["read", "write"]}
        />
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
        <PermissionRadioButton
          onChange={onChange}
          value={value}
          rowProps={props}
          targetActions={["read", "write", "delete"]}
        />
      ),
    },
  ];

  return (
    <Box component={Paper} variant="outlined" p={2} id={category}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={2}>
          <img src={modulesImages[category]} />
          <Typography variant="body1" color="text.primary">
            {capitalizeEachWord(category)}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Switch {...showButtonProps} />
          <Typography variant="body1" color="text.secondary" fontWeight={400}>
            Show
          </Typography>
        </Box>
      </Box>
      {showPanel && (
        <Box mt={2}>
          <DataGridPro
            hideFooter
            style={{ textAlign: "center" }}
            disableColumnSelector
            disableColumnMenu
            disableColumnReorder
            disableRowSelectionOnClick
            columns={columns}
            getRowId={(item) => item[0]}
            rows={Object.entries(groupedAbilitesBySubcategory)}
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "transparent !important",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PermissionControlForm;
