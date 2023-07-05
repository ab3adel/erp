import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid-pro";
import { CellTextField } from "../../../components/EditableDatagrid";
import { VolumeToWieghtUnit, WithId } from "../../../../../types";

export type Row = WithId<Partial<VolumeToWieghtUnit>>;

export const useVolToWeColumns = () =>
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
        headerName: "State of Coffee",
        field: "coffee_state",
        flex: 1,
        sortable: false,
      },
      {
        headerName: "Equivalent in (L)",
        field: "toL",
        flex: 1,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellTextField type="number" params={params} label="Value in Litres" />
        ),
      },
      {
        headerName: "Equivalent in (Kg)",
        field: "toKg",
        flex: 1,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellTextField type="number" params={params} label="Value in Kilograms" />
        ),
      },
    ],
    []
  );
