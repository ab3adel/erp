import { Box, Typography } from "@mui/material";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { uniqueId } from "lodash";
import { useOriginSettingGetter } from "../../../hooks/states";

const columns: GridColDef[] = [
  {
    headerName: "Our Words",
    field: "ours",
    flex: 1,
    sortable: false,
    renderCell: (params) => (        <Box>
      <Typography variant="body2" color="text.primary">
        {params.row?.term}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {params.row?.description}
      </Typography>
    </Box>)
  },
  {
    headerName: "Your Words",
    field: "label",
    flex: 1,
    sortable: false,
  },
];

const KeywordConfigurationTable = () => {
  const rows = useOriginSettingGetter(
    "tenant",
    "terminology",
    (payload: Record<string, any>[]) =>
      payload?.map((row) => ({
        ...row,
        id: uniqueId(),
      }))
  );
  return (
    <DataGridPro
      sx={{
        overflowX: "scroll",
        "& .MuiDataGrid-row:last-child > *": {
          border: "none",
        },
      }}
      autoHeight
      rowHeight={80}
      columns={columns}
      disableRowSelectionOnClick
      hideFooter
      rows={rows ?? []}
    />
  );
};
export default KeywordConfigurationTable;
