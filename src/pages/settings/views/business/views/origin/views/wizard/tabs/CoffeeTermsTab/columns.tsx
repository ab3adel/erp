import { useMemo } from "react";
import { GridColDef, GridRowId } from "@mui/x-data-grid-pro";
import { CoffeeTerm, WithId } from "../../../../types";
import {
  CellSelect,
  CellTextField,
  CellAutocomplete,
  cellDeleteAction,
} from "../../components/EditableDatagrid";

export type Row = WithId<Partial<CoffeeTerm>>;

export const useCoffeeTermsColumns = (
  coffeeStates: string[],
  grades: string[],
  locations: string[],
  onDelete: (id: GridRowId) => void
) =>
  useMemo<GridColDef<Row>[]>(
    () => [
      {
        headerName: "Our Words",
        field: "coffee_state",
        flex: 1,
        minWidth: 195,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellSelect
            params={params}
            label="State of Coffee"
            options={coffeeStates}
          />
        ),
      },
      {
        headerName: "Your Words",
        field: "label",
        flex: 1,
        minWidth: 195,
        sortable: false,
        editable: true,
        renderEditCell: (params) => <CellTextField params={params} />,
      },
      {
        headerName: "Sub-Types/Grades",
        field: "grades",
        flex: 1,
        minWidth: 256,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellAutocomplete params={params} options={grades} />
        ),
      },
      {
        headerName: "Location(s)",
        field: "locations",
        flex: 1,
        minWidth: 256,
        sortable: false,
        editable: true,
        renderEditCell: (params) => (
          <CellAutocomplete params={params} options={locations} />
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
    [coffeeStates, grades, locations, onDelete]
  );
