import { useMemo } from "react";
import { GridColDef, GridRowId } from "@mui/x-data-grid-pro";
import {
  cellDeleteAction,
  CellAutocomplete,
  CellSelect,
  CellCheckBox,
} from "../../components/EditableDatagrid";
import { ALocation, WithId } from "../../../../types";

export type Row = WithId<Partial<ALocation>>;

export const useLocationsColumns = (
  accountCategories: string[] | undefined,
  processMethods: string[] | undefined,
  onDelete: (id: GridRowId) => void
) =>
  useMemo<GridColDef<Row>[]>(
    () => [
      {
        headerName: "Location",
        field: "location",
        minWidth: 147,
        sortable: false,
      },
      {
        headerName: "Sub-Locations",
        field: "sub_locations",
        flex: 1,
        minWidth: 252,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellAutocomplete params={params} label="Select Sub-Locations" />
        ),
      },
      {
        headerName: "Account Type",
        field: "category",
        flex: 1,
        minWidth: 252,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellSelect
            params={params}
            label="Select Option"
            options={accountCategories}
          />
        ),
      },
      {
        headerName: "Processing Method",
        field: "process_methods",
        flex: 1,
        minWidth: 252,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellAutocomplete
            params={params}
            label="Select Sub-Locations"
            options={processMethods}
          />
        ),
      },
      {
        headerName: "Release Inventory",
        field: "release_inventory",
        flex: 1,
        minWidth: 147,
        sortable: false,
        editable: true,
        renderCell: (params) => (params.value ? "Yes" : "No"),
        renderEditCell: (params) => <CellCheckBox params={params} />,
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
    [onDelete, accountCategories, processMethods]
  );
