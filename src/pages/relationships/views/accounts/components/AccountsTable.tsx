import { useAccountsTableColumns } from "../hooks/useAccountsTableColumns";
import { useAccountsTableRows } from "../hooks/useAccountsTableRows";
import { DataGrid } from "@mui/x-data-grid";
import { AccountsTableToolbar } from "./AccountsTableToolbar";

export const AccountsTable = () => {
  const { rows, loading } = useAccountsTableRows();
  const columns = useAccountsTableColumns();

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          checkboxSelection
          paginationMode="client"
          slots={{
            toolbar: AccountsTableToolbar,
          }}
        />
      </div>
    </div>
  );
};
