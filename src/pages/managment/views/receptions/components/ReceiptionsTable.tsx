import { useReceiptionsTableColumns } from "../hooks/useReceiptionsTableColumns";
import { useReceiptionsTableRows } from "../hooks/useReceiptionsTableRows";
import { DataGrid } from "@mui/x-data-grid";
import { ReceiptionsTableToolbar } from "./ReceiptionsTableToolbar";

export const ReceiptionsTable = () => {
  const { rows, loading } = useReceiptionsTableRows();
  const columns = useReceiptionsTableColumns();

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
            toolbar: ReceiptionsTableToolbar,
          }}
        />
      </div>
    </div>
  );
};
