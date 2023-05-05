import { useReceiptionsTableColumns } from "../hooks/useReceiptionsTableColumns";
import { useReceiptionsTableRows } from "../hooks/useReceiptionsTableRows";
import { DataGrid } from "@mui/x-data-grid";
import { ReceiptionsTableToolbar } from "./ReceiptionsTableToolbar";
import { useState } from "react";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { Action } from "../types";

export const ReceiptionsTable = ({
  apiRef,
  dispatch,
  isRowAdded,
}: ReceiptionsTableProps) => {
  const { rows, loading } = useReceiptionsTableRows();
  const columns = useReceiptionsTableColumns();
  const [rowsSelection, setRowsSelection] = useState<string[]>([]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
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
  apiRef: React.MutableRefObject<GridApiCommunity>;
  dispatch: (action: Action) => void;
  isRowAdded: boolean;
};
