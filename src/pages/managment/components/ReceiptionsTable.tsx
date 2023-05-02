import { useReceiptionsTableColumns } from "../hooks/useReceiptionsTableColumns";
import { useReceiptionsTableRows } from "../hooks/useReceiptionsTableRows";
import { DataGrid } from "@mui/x-data-grid";

export const ReceiptionsTable = () => {
  const rows = useReceiptionsTableRows();
  const columns = useReceiptionsTableColumns();
  return (
    <div style={{ display: "flex", height: "500px" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </div>
    </div>
  );
};
