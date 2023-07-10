import { useReceiptionsTableColumns } from "../hooks/useReceiptionsTableColumns";
import { useReceiptionsTableRows } from "../hooks/useReceiptionsTableRows";
import {
  DataGridPro,
  GridFilterModel,
  GridPaginationModel,
} from "@mui/x-data-grid-pro";
import { ReceiptionsTableToolbar } from "../containers/receiptionsTableToolbar/ReceiptionsTableToolbar";
import { useState } from "react";
import { Action } from "../types";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";

import { CustomPagination } from "@/pages/relationships/views/accounts/components/CustomPagination";
import ReceptionsTableFooter from "./ReceptionsTableFooter/ReceptionsTableFooter";

export const ReceiptionsTable = ({
  apiRef,
  dispatch,
  isRowAdded,
}: ReceiptionsTableProps) => {
  const columns = useReceiptionsTableColumns();
  const [rowsSelection, setRowsSelection] = useState<string[]>([]);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [filterModel, setFilterModel] = useState<GridFilterModel>();
  const { rows, loading, paginatorInfo } = useReceiptionsTableRows(
    paginationModel,
    filterModel
  );

  return (
    <div style={{ height: "63vh" }}>
      <DataGridPro
        isRowSelectable={(params) =>
          apiRef.current.getCellMode(params.id, "status") === "view"
        }
        sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        loading={loading}
        apiRef={apiRef}
        rowSelectionModel={rowsSelection}
        onRowSelectionModelChange={(newSelection) => {
          setRowsSelection(newSelection as string[]);
        }}
        filterMode="server"
        filterModel={filterModel}
        onFilterModelChange={(newModel) => {
          setFilterModel(newModel);
        }}
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => {
          setPaginationModel(newModel);
        }}
        rowCount={paginatorInfo?.total || 0}
        rows={rows}
        columns={columns}
        checkboxSelection
        paginationMode="server"
        slotProps={{
          toolbar: {
            rowsSelection,
            isRowAdded,
            dispatch,
          },
          headerFilterCell: {
            InputComponentProps: {
              sx: {
                "&::before, &::after": {
                  borderBottom: "none !important",
                },
                "& .MuiInputBase-root": {
                  "&::before, &::after": {
                    borderBottom: "none !important",
                  },
                },
              },
            },
          },
        }}
        slots={{
          toolbar: ReceiptionsTableToolbar,
          pagination: CustomPagination,
          footer: ReceptionsTableFooter,
        }}
        pagination
        pageSizeOptions={[10, 25, 50]}
        unstable_headerFilters
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
      />
    </div>
  );
};

type ReceiptionsTableProps = {
  apiRef: React.MutableRefObject<GridApiPro>;
  dispatch: (action: Action) => void;
  isRowAdded: boolean;
};
