import { DataGrid } from "@mui/x-data-grid";
import { useLotDataGridColumns } from "../hooks/useLotDataGridColumns";
import { useLotsDataGridRows } from "../hooks/useLotsDataGridRows";
import { LotsGridToolbar } from "./LotsGridToolbar";
import { useState } from "react";

function LotsGrid(props: LotsGridProps) {
  const columns = useLotDataGridColumns();
  const { rows, loading } = useLotsDataGridRows();
  const [rowsSelection, setRowsSelection] = useState<string[]>([]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 420, width: "100%" }}>
        <DataGrid
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

type LotsGridProps = {
  type: "cherry" | "pachment" | "green";
};
export default LotsGrid;
