import { DataGridPro } from "@mui/x-data-grid-pro";
import { useLotDataGridColumns } from "../hooks/useLotDataGridColumns";
import { useLotsDataGridRows } from "../hooks/useLotsDataGridRows";
import { LotsGridToolbar } from "./LotsGridToolbar";
import { useState } from "react";

function LotsGrid() {
  const columns = useLotDataGridColumns();
  const { rows, loading } = useLotsDataGridRows();
  const [rowsSelection, setRowsSelection] = useState<string[]>([]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 420, width: "100%" }}>
        <DataGridPro
          columns={columns}
          loading={loading}
          rows={rows}
          checkboxSelection
          paginationMode="client"
          rowSelectionModel={rowsSelection}
          onRowSelectionModelChange={(newSelection) => {
            setRowsSelection(newSelection as string[]);
          }}
          slots={{
            toolbar: LotsGridToolbar,
          }}
          slotProps={{
            toolbar: {
              rowsSelection,
            },
          }}
        />
      </div>
    </div>
  );
}

export default LotsGrid;
