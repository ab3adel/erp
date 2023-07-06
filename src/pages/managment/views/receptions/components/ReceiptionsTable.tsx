import { useReceiptionsTableColumns } from "../hooks/useReceiptionsTableColumns";
import { useReceiptionsTableRows } from "../hooks/useReceiptionsTableRows";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { ReceiptionsTableToolbar } from "./ReceiptionsTableToolbar";
import { useState } from "react";
import { Action } from "../types";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";

export const ReceiptionsTable = ({
  apiRef,
  dispatch,
  isRowAdded,
}: ReceiptionsTableProps) => {
  const { rows, loading } = useReceiptionsTableRows();
  const columns = useReceiptionsTableColumns();
  const [rowsSelection, setRowsSelection] = useState<string[]>([]);

  console.log(rows)

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 450, width: "100%" }}>
        <DataGridPro
          loading={loading}
          apiRef={apiRef}
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
              isRowAdded,
              dispatch,
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

type ReceiptionsTableProps = {
  apiRef: React.MutableRefObject<GridApiPro>;
  dispatch: (action: Action) => void;
  isRowAdded: boolean;
};
