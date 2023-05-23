import { useAccountsTableColumns } from "../hooks/useAccountsTableColumns";
import { useAccountsTableRows } from "../hooks/useAccountsTableRows";
import { DataGrid, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { AccountsTableToolbar } from "./AccountsTableToolbar";
import { useState } from "react";
import { Action } from "../hooks/useAddAccount";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { useCurvedTabs } from "@/shared/components/curvedTabs/hooks/useCurvedTabs";
import { useSearchParams } from "react-router-dom";

export const AccountsCustomViewTable = ({
  apiRef,
  dispatch,
  isRowAdded,
}: AccountsTableProps) => {
  const { rows, loading } = useAccountsTableRows();
  const columns = useAccountsTableColumns();
  const [rowsSelection, setRowsSelection] = useState<string[]>([]);
  const { getColumnVisibiltyModelByTabParam } = useCurvedTabs({
    localStorageKey: "relationships",
  });
  const [params] = useSearchParams();
  const tabParam = params.get("tab");
  const defaultModel = getColumnVisibiltyModelByTabParam(tabParam!);
  const [model, setModel] = useState<GridColumnVisibilityModel>(defaultModel!);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          columnVisibilityModel={model}
          onColumnVisibilityModelChange={(newModel) => setModel(newModel)}
          loading={loading}
          rows={rows}
          columns={columns}
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
  apiRef: React.MutableRefObject<GridApiCommunity>;
  dispatch: (action: Action) => void;
  isRowAdded: boolean;
};
