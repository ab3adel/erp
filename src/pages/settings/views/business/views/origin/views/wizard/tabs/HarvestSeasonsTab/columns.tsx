import { useMemo } from "react";
import { GridColDef, GridRowId } from "@mui/x-data-grid-pro";
import {
  CellTextField,
  CellDatePicker,
  CellCheckBox,
} from "../../components/EditableDatagrid";
import dayjs, { Dayjs } from "dayjs";

export type Row = {
  id: GridRowId;
  name?: string;
  start?: Dayjs;
  end?: Dayjs;
};

export const useHarvestSeasonsColumns =
  (/* onDelete: (id: GridRowId) => void */) =>
    useMemo<GridColDef<Row>[]>(
      () => [
        {
          headerName: "Name",
          field: "name",
          flex: 1,
          sortable: false,
          editable: true,
          renderEditCell: (params) => (
            <CellTextField
              params={params}
              label="Name"
              placeholder="Enter Harvest Name"
            />
          ),
        },
        {
          headerName: "Start",
          field: "start",
          flex: 1,
          sortable: false,
          editable: true,
          valueFormatter: ({ value }) =>
            value ? dayjs(value).format("ll") : "",
          renderEditCell: (params) => <CellDatePicker params={params} />,
        },
        {
          headerName: "End",
          field: "end",
          flex: 1,
          sortable: false,
          editable: true,
          valueFormatter: ({ value }) =>
            value ? dayjs(value).format("ll") : "",
          renderEditCell: (params) => <CellDatePicker params={params} />,
        },
        {
          headerName: "Show in Inventory",
          field: "show_in_inventory",
          flex: 1,
          sortable: false,
          editable: true,
          renderEditCell: (params) => <CellCheckBox params={params} />,
          renderCell: (params) => (params.value ? "Yes" : "No"),
        },
      ],
      [
        /* onDelete */
      ]
    );
