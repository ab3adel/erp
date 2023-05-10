import { useAccountsTableColumns } from "../hooks/useAccountsTableColumns";
import { useAccountsTableRows } from "../hooks/useAccountsTableRows";
import { DataGrid } from "@mui/x-data-grid";
import { AccountsTableToolbar } from "./AccountsTableToolbar";
import { useState } from "react";
import { Action } from "../hooks/useAddAccount";
import { GridApiCommunity } from "@mui/x-data-grid/internals";

export const AccountsTable = ({
  apiRef,
  dispatch,
  isRowAdded,
}: AccountsTableProps) => {
  const { rows, loading } = useAccountsTableRows();
  const columns = useAccountsTableColumns();
  const [rowsSelection, setRowsSelection] = useState<string[]>([]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
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
