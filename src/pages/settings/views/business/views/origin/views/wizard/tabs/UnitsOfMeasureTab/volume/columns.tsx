import { useMemo } from "react";
import { GridColDef, GridRowId } from "@mui/x-data-grid-pro";
import {
  CellTextField,
  cellDeleteAction,
} from "../../../components/EditableDatagrid";

type Row = {
  id: GridRowId;
  uom: string;
  value: number;
};

export const useWeightColumns = (onDelete: (id: GridRowId) => void) =>
  useMemo<GridColDef<Row>[]>(
    () => [
      {
        headerName: "Quantity",
        field: "quantity",
        width: 88,
        sortable: false,
        valueGetter: () => 1,
      },
      {
        headerName: "Your Unit of Measure",
        field: "uom",
        flex: 1,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellTextField params={params} label="Unit of Measure" />
        ),
      },
      {
        headerName: "Equivalent in Litres (L)",
        field: "value",
        flex: 1,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellTextField params={params} label="Value in L" />
        ),
      },
      {
        field: "actions",
        type: "actions",
        flex: 1,
        maxWidth: 100,
        sortable: false,
        getActions: (params) => cellDeleteAction(params, onDelete),
      },
    ],
    [onDelete]
  );
