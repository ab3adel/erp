import { useMemo } from "react";
import { GridColDef, GridRowId } from "@mui/x-data-grid-pro";
import { CellTextField } from "../../components/EditableDatagrid";
import { Box, Typography } from "@mui/material";

export type Row = {
  id: GridRowId;
  term: string;
  description: string;
  label: string;
};

export const useKeywordConfigurationColumns = () =>
  useMemo<GridColDef<Row>[]>(
    () => [
      {
        headerName: "Our Words",
        field: "term",
        flex: 1,
        sortable: false,
        renderCell: (params) => (
          <Box>
            <Typography variant="body2" color="text.primary">
              {params.row.term}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {params.row.description}
            </Typography>
          </Box>
        ),
      },
      {
        headerName: "Your Words",
        field: "label",
        flex: 1,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellTextField params={params} label="Enter Your Term" />
        ),
      },
    ],
    []
  );
