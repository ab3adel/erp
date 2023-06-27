import { GridRowId, GridColDef } from "@mui/x-data-grid-pro";
import { useMemo } from "react";
import { CellTextField } from "../../components/EditableDatagrid";

export type Row = {
  id: GridRowId;
  process_method?: string;
  cherry_to_wet?: number;
  wet_to_dry?: number;
  dry_to_green?: number;
  total?: number;
};

export const useYieldEstimationsColumns = () =>
  useMemo<GridColDef<Row>[]>(
    () => [
      {
        headerName: "Process Method",
        field: "process_method",
        flex: 1,
        sortable: false,
      },
      {
        headerName: "Cherry to Wet %",
        field: "cherry_to_wet",
        flex: 1,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellTextField params={params} label="Enter %" />
        ),
      },
      {
        headerName: "Wet to Dry %",
        field: "wet_to_dry",
        flex: 1,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellTextField params={params} label="Enter %" />
        ),
      },
      {
        headerName: "Dry to Green %",
        field: "dry_to_green",
        flex: 1,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellTextField params={params} label="Enter %" />
        ),
      },
      {
        headerName: "Total %",
        field: "total",
        width: 88,
        sortable: false,
        align: "center",
        valueFormatter: (params) =>
          Math.round((params.value ?? 100) * 100) / 100,
      },
    ],
    []
  );
