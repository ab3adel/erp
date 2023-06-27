import { GridColDef, GridRowId } from "@mui/x-data-grid-pro";
import { useMemo } from "react";
import {
  CellSelect,
  CellTextField,
  cellDeleteAction,
} from "../../components/EditableDatagrid";

export type Row = {
  id: GridRowId;
  category?: string;
  account_type?: string;
};

export const useAccountTypesColumns = (
  accountCategories: string[],
  onDelete: (id: GridRowId) => void
) =>
  useMemo<GridColDef<Row>[]>(
    () => [
      {
        headerName: "Our Words",
        field: "category",
        flex: 1,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellSelect
            params={params}
            label="Account Type"
            options={accountCategories}
          />
        ),
      },
      {
        headerName: "Your Words",
        field: "account_type",
        flex: 1,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellTextField params={params} label="Enter Your Words" />
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
    [onDelete, accountCategories]
  );
