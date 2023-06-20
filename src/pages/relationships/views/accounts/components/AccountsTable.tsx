import { useAccountsTableColumns } from "../hooks/useAccountsTableColumns";
import { useAccountsTableRows } from "../hooks/useAccountsTableRows";
import {
  DataGridPro,
  GridColDef,
  GridColumnVisibilityModel,
  GridFilterModel,
  GridPaginationModel,
} from "@mui/x-data-grid-pro";
import { AccountsTableToolbar } from "./AccountsTableToolbar";
import { useState } from "react";
import { Action } from "../hooks/useAddAccount";
import { useCurvedTabs } from "@/shared/components/curvedTabs/hooks/useCurvedTabs";
import { CreateViewForm } from "./CreateViewForm";
import { GenericDialog, useDialog, useGenericMutation } from "@/shared";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import { ManageColumnsPanel } from "@/shared/components/ManageColumnsPanel";
import { saveAccount } from "../graphql/mutations/saveAccount";
import { AccountInput } from "../types";

export const AccountsTable = ({
  apiRef,
  dispatch,
  isRowAdded,
}: AccountsTableProps) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [filterModel, setFilterModel] = useState<GridFilterModel>();
  const { rows, loading, paginationInfo } = useAccountsTableRows(
    paginationModel,
    filterModel
  );
  const columns = useAccountsTableColumns();
  const [rowsSelection, setRowsSelection] = useState<string[]>([]);
  const { createTab } = useCurvedTabs({ localStorageKey: "relationships" });
  const [model, setModel] = useState<GridColumnVisibilityModel>();
  const { closeDialog, isDialogOpen, openDialog } = useDialog<"save_view">();
  const [columnsState, setColumnsState] = useState<GridColDef[]>(columns);
  const [openColumnsDialog, setOpenColumnsDialog] = useState(false);
  const [edit] = useGenericMutation<
    {
      updateOrInsertAccount: {
        id: number;
      };
    },
    Variables
  >(saveAccount, { refetchQueries: ["AccountsQuery"] });
  const handleCreateView = (form: {
    label: string;
    type: "personal" | "shared";
  }) => {
    createTab(
      form.label,
      model!,
      columnsState,
      filterModel,
      form.type === "shared"
    );
    closeDialog();
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: "63vh", width: "100%" }}>
        <DataGridPro
          unstable_headerFilters
          loading={loading}
          rows={rows}
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel) => {
            setPaginationModel(newModel);
          }}
          filterMode="server"
          filterModel={filterModel}
          onFilterModelChange={(newModel) => {
            setFilterModel(newModel);
          }}
          pagination
          pageSizeOptions={[10, 25, 50]}
          rowCount={paginationInfo?.total || 0}
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
          paginationMode="server"
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
          processRowUpdate={(newRow, oldRow) => {
            const updatedValues: Record<string, any> = {};
            if (newRow.id === "new") {
              return Promise.resolve(newRow);
            }
            for (const key in newRow) {
              if (newRow[key] !== oldRow[key] && key !== "type") {
                updatedValues[key] = newRow[key];
              }
            }

            return edit({
              variables: {
                input: {
                  ...updatedValues,
                  id: newRow.id,
                  ...(newRow.type && {
                    type_id: newRow.type.value,
                  }),
                },
              },
            }).then((value) => {
              return value.data?.updateOrInsertAccount;
            });
          }}
          onProcessRowUpdateError={(error) => {
            console.log(error);
          }}
        />
      </div>
      <GenericDialog
        open={isDialogOpen("save_view")}
        onClose={closeDialog}
        color="#fff"
        hideCloseButton={false}
        dialog={{
          title: "Create new saved view",
          closeButton: {
            label: "Cancel",
            color: "inherit",
            sx: {
              visibility: "hidden",
            },
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
        columns={columns}
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

type Variables = {
  input: AccountInput;
};
