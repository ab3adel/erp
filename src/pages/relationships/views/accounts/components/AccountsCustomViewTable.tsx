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
import { Account } from "@/shared/models/models";
import { GenericDialog, useDialog, useGenericMutation } from "@/shared";
import { saveAccount } from "../graphql/mutations/saveAccount";
import { CreateViewForm } from "./CreateViewForm";
import { AccountInput } from "../types";

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
    createTab,
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
  const { closeDialog, isDialogOpen, openDialog } = useDialog<"save_view">();
  const [model, setModel] = useState<GridColumnVisibilityModel>(defaultModel!);
  const [filterModel, setFilterModel] = useState<GridFilterModel>(
    defaultFilterModel!
  );

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
            columnsState.map(
              (col) =>
                rawColumns?.find(
                  (colState) => colState.field === col.field
                ) as GridColDef<Account>
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
          processRowUpdate={(newRow: any, oldRow) => {
            const updatedValues: Record<string, any> = {};
            if (newRow.id === "new") {
              return Promise.resolve(newRow);
            }
            for (const key in newRow) {
              if (newRow[key] !== oldRow[key] && key !== "type") {
                updatedValues[key] = newRow[key];
              }
            }
            const [edit] = useGenericMutation<
              {
                updateOrInsertAccount: {
                  id: number;
                };
              },
              Variables
            >(saveAccount, { refetchQueries: ["AccountsQuery"] });

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

type Variables = {
  input: AccountInput;
};
