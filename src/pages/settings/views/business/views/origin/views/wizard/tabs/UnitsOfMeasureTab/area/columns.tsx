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

export const useAreaColumns = (onDelete: (id: GridRowId) => void) =>
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
        headerName: "Equivalent in Hectare (Ha)",
        field: "value",
        flex: 1,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellTextField type="number" params={params} label="Value in Ha" />
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
