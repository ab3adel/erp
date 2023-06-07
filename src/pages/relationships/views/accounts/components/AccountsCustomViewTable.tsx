import {
  DataGridPro,
  GridColumnVisibilityModel,
  GridColDef,
  GridPaginationModel,
  GridFilterModel,
} from "@mui/x-data-grid-pro";
import { AccountsTableToolbar } from "./AccountsTableToolbar";
import { useState } from "react";
import { Action } from "../hooks/useAddAccount";
import { useCurvedTabs } from "@/shared/components/curvedTabs/hooks/useCurvedTabs";
import { useSearchParams } from "react-router-dom";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import { ManageColumnsPanel } from "@/shared/components/ManageColumnsPanel";
import { useAccountsTableRows } from "../hooks/useAccountsTableRows";
import { useAccountsTableColumns } from "../hooks/useAccountsTableColumns";

export const AccountsCustomViewTable = ({
  apiRef,
  dispatch,
  isRowAdded,
}: AccountsTableProps) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const { rows, loading, paginationInfo } =
    useAccountsTableRows(paginationModel);
  const [rowsSelection, setRowsSelection] = useState<string[]>([]);
  const {
    getColumnVisibiltyModelByTabParam,
    getColumnsByTabParam,
    getGridFilterModelByTabParam,
  } = useCurvedTabs({
    localStorageKey: "relationships",
  });
  const rawColumns = useAccountsTableColumns();

  const [params] = useSearchParams();
  const tabParam = params.get("tab");

  const defaultModel = getColumnVisibiltyModelByTabParam(tabParam!);
  const defaultFilterModel = getGridFilterModelByTabParam(tabParam!);
  const columnsValue = getColumnsByTabParam(tabParam!);
  const [columnsState, setColumnsState] = useState<GridColDef[]>(columnsValue!);
  const [openColumnsDialog, setOpenColumnsDialog] = useState(false);
  const [model, setModel] = useState<GridColumnVisibilityModel>(defaultModel!);
  const [filterModel, setFilterModel] = useState<GridFilterModel>(
    defaultFilterModel!
  );

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: "68vh", width: "100%" }}>
        <DataGridPro
          unstable_headerFilters
          pagination
          columnVisibilityModel={model}
          onColumnVisibilityModelChange={(newModel) => setModel(newModel)}
          loading={loading}
          filterModel={filterModel}
          onFilterModelChange={(newModel) => setFilterModel(newModel)}
          rowCount={paginationInfo?.total || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel) => {
            setPaginationModel(newModel);
          }}
          rows={rows}
          columns={
            rawColumns.filter((col) =>
              columnsState?.find((colState) => colState.field === col.field)
            ) || []
          }
          apiRef={apiRef}
          pageSizeOptions={[10, 25, 50]}
          rowSelectionModel={rowsSelection}
          onRowSelectionModelChange={(newSelection) => {
            setRowsSelection(newSelection as string[]);
          }}
          checkboxSelection
          paginationMode="server"
          slots={{
            toolbar: AccountsTableToolbar,
          }}
          slotProps={{
            toolbar: {
              rowsSelection,
              dispatch,
              isRowAdded,
              setOpenColumnsDialog,
            },
          }}
        />
      </div>
      <ManageColumnsPanel
        open={openColumnsDialog}
        onClose={() => setOpenColumnsDialog(false)}
        columns={columnsValue || []}
        setColumns={setColumnsState}
        setVisibiltyModel={setModel}
        visibiltyModel={model}
      />
    </div>
  );
};

type AccountsTableProps = {
  apiRef: React.MutableRefObject<GridApiPro>;
  dispatch: (action: Action) => void;
  isRowAdded: boolean;
};
