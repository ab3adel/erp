import { useReceiptionsTableColumns } from "../hooks/useReceiptionsTableColumns";
import { useReceiptionsTableRows } from "../hooks/useReceiptionsTableRows";
import { DataGrid } from "@mui/x-data-grid";
import { ReceiptionsTableToolbar } from "./ReceiptionsTableToolbar";
import { useState } from "react";

export const ReceiptionsTable = () => {
  const { rows, loading } = useReceiptionsTableRows();
  const columns = useReceiptionsTableColumns();
  const [rowsSelection, setRowsSelection] = useState<string[]>([]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          loading={loading}
          rowSelectionModel={rowsSelection}
          onRowSelectionModelChange={(newSelection) => {
            setRowsSelection(newSelection as string[]);
          }}
          rows={rows}
          columns={columns}
          checkboxSelection
          paginationMode="client"
          slotProps={{
            toolbar: {
              rowsSelection,
            },
          }}
          slots={{
            toolbar: ReceiptionsTableToolbar,
          }}
        />
      </div>
    </div>
  );
};
