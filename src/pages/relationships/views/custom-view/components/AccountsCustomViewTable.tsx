import { useAccountsTableRows } from "../hooks/useAccountsTableRows";
import { DataGridPro, GridColumnVisibilityModel } from "@mui/x-data-grid-pro";
import { AccountsTableToolbar } from "./AccountsTableToolbar";
import { useState } from "react";
import { Action } from "../hooks/useAddAccount";
import { useCurvedTabs } from "@/shared/components/curvedTabs/hooks/useCurvedTabs";
import { useSearchParams } from "react-router-dom";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";

export const AccountsCustomViewTable = ({
  apiRef,
  dispatch,
  isRowAdded,
}: AccountsTableProps) => {
  const { rows, loading } = useAccountsTableRows();
  const [rowsSelection, setRowsSelection] = useState<string[]>([]);
  const { getColumnVisibiltyModelByTabParam, getColumnsByTabParam } =
    useCurvedTabs({
      localStorageKey: "relationships",
    });
  const [params] = useSearchParams();
  const tabParam = params.get("tab");
  const defaultModel = getColumnVisibiltyModelByTabParam(tabParam!);
  const columnsValue = getColumnsByTabParam(tabParam!);
  const [model, setModel] = useState<GridColumnVisibilityModel>(defaultModel!);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 450, width: "100%" }}>
        <DataGridPro
          unstable_headerFilters
          columnVisibilityModel={model}
          onColumnVisibilityModelChange={(newModel) => setModel(newModel)}
          loading={loading}
          rows={rows}
          columns={columnsValue || []}
          apiRef={apiRef}
          rowSelectionModel={rowsSelection}
          onRowSelectionModelChange={(newSelection) => {
            setRowsSelection(newSelection as string[]);
          }}
          checkboxSelection
          paginationMode="client"
          slots={{
            toolbar: AccountsTableToolbar,
          }}
          slotProps={{
            toolbar: { rowsSelection, dispatch, isRowAdded },
          }}
        />
      </div>
    </div>
  );
};

type AccountsTableProps = {
  apiRef: React.MutableRefObject<GridApiPro>;
  dispatch: (action: Action) => void;
  isRowAdded: boolean;
};
