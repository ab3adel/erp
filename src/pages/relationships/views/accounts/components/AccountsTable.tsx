import { useAccountsTableColumns } from "../hooks/useAccountsTableColumns";
import { useAccountsTableRows } from "../hooks/useAccountsTableRows";
import { DataGrid, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { AccountsTableToolbar } from "./AccountsTableToolbar";
import { useState } from "react";
import { Action } from "../hooks/useAddAccount";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { useCurvedTabs } from "@/shared/components/curvedTabs/hooks/useCurvedTabs";
import { CreateViewForm } from "./CreateViewForm";
import { GenericDialog, useDialog } from "@/shared";

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

  const handleCreateView = (form: {
    label: string;
    type: "personal" | "shared";
  }) => {
    createTab(form.label, model!);
    closeDialog();
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          columnVisibilityModel={model}
          onColumnVisibilityModelChange={(newModel) => setModel(newModel)}
          loading={loading}
          rows={rows}
          columns={columns}
          apiRef={apiRef}
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
            toolbar: { rowsSelection, dispatch, isRowAdded, openDialog },
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
    </div>
  );
};

type AccountsTableProps = {
  apiRef: React.MutableRefObject<GridApiCommunity>;
  dispatch: (action: Action) => void;
  isRowAdded: boolean;
};
