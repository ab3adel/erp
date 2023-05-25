import { useAccountsTableColumns } from "../hooks/useAccountsTableColumns";
import { useAccountsTableRows } from "../hooks/useAccountsTableRows";
import {
  DataGridPro,
  GridColDef,
  GridColumnVisibilityModel,
} from "@mui/x-data-grid-pro";
import { AccountsTableToolbar } from "./AccountsTableToolbar";
import { useState } from "react";
import { Action } from "../hooks/useAddAccount";
import { useCurvedTabs } from "@/shared/components/curvedTabs/hooks/useCurvedTabs";
import { CreateViewForm } from "./CreateViewForm";
import { GenericDialog, useDialog } from "@/shared";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import { ManageColumnsPanel } from "@/shared/components/ManageColumnsPanel";

export const AccountsTable = ({
  apiRef,
  dispatch,
  isRowAdded,
}: AccountsTableProps) => {
  const { rows, loading } = useAccountsTableRows();
  const columns = useAccountsTableColumns();
  const [rowsSelection, setRowsSelection] = useState<string[]>([]);
  const { createTab } = useCurvedTabs({ localStorageKey: "relationships" });
  const [model, setModel] = useState<GridColumnVisibilityModel>();
  const { closeDialog, isDialogOpen, openDialog } = useDialog<"save_view">();
  const [columnsState, setColumnsState] = useState<GridColDef[]>(columns);
  const [openColumnsDialog, setOpenColumnsDialog] = useState(false);

  console.log(model);
  const handleCreateView = (form: {
    label: string;
    type: "personal" | "shared";
  }) => {
    createTab(form.label, model!, columnsState);
    closeDialog();
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 450, width: "100%" }}>
        <DataGridPro
          unstable_headerFilters
          loading={loading}
          rows={rows}
          columns={columnsState}
          apiRef={apiRef}
          columnVisibilityModel={model}
          onColumnVisibilityModelChange={(newModel) => {
            setModel(newModel);
          }}
          rowSelectionModel={rowsSelection}
          onRowSelectionModelChange={(newSelection) => {
            setRowsSelection(newSelection as string[]);
          }}
          checkboxSelection
          paginationMode="client"
          slots={{
            toolbar: AccountsTableToolbar,
          }}
          slotProps={{
            toolbar: {
              rowsSelection,
              dispatch,
              isRowAdded,
              openDialog,
              setOpenColumnsDialog,
            },
          }}
        />
      </div>
      <GenericDialog
        open={isDialogOpen("save_view")}
        onClose={closeDialog}
        color="#fff"
        hideCloseButton={false}
        dialog={{
          title: "Save View",
          closeButton: {
            label: "Cancel",
            color: "inherit",
          },
          submitButton: {
            label: "Save",
            type: "submit",
            form: "save_view_form",
          },
        }}
      >
        <CreateViewForm onSubmit={handleCreateView} />
      </GenericDialog>
      <ManageColumnsPanel
        columns={columnsState}
        setColumns={setColumnsState}
        open={openColumnsDialog}
        onClose={() => setOpenColumnsDialog(false)}
        visibiltyModel={model}
        setVisibiltyModel={setModel}
      />
    </div>
  );
};

type AccountsTableProps = {
  apiRef: React.MutableRefObject<GridApiPro>;
  dispatch: (action: Action) => void;
  isRowAdded: boolean;
};
