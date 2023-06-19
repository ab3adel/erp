import React from "react";
import { useGenericMutation } from "@/shared";
import { saveAccount } from "../graphql/mutations/saveAccount";
import { AccountInput } from "../types";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import { enqueueSnackbar } from "notistack";
import { Account } from "@/shared/models/models";

export const useAddAccount = (ref: React.MutableRefObject<GridApiPro>) => {
  const [isRowAdded, setIsRowAdded] = React.useState(false);
  const [save] = useGenericMutation<{ __typename: string }, Variables>(
    saveAccount,
    { refetchQueries: ["AccountsQuery", "accountProfile"] }
  );

  const dispatch = (action: Action) => {
    const row: Partial<Record<string, any>> = { id: "new" };
    switch (action.type) {
      case "ADD_ACCOUNT": {
        const rowsModels = ref.current.getRowModels();
        if (rowsModels.get("new")) {
          return;
        }
        const rows = Array.from(rowsModels.values());
        rows.unshift(row);
        ref.current.setRows(rows);
        ref.current.startCellEditMode({
          id: "new",
          field: "name",
        });
        setIsRowAdded(true);
        break;
      }
      case "CANCEL_ACCOUNT":
        ref.current.updateRows([{ ...row, _action: "delete" }]);
        setIsRowAdded(false);
        break;
      case "SAVE_ACCOUNT": {
        const newRow = ref.current.getRowModels().get("new") as Account;
        console.log(newRow);
        if (newRow) {
          const { id, ...data } = newRow;
          save({
            variables: {
              input: {
                name: data.name,
                address1: data.address1 || "",
                district: data.district,
                first_name: data.first_name,
                last_name: data.last_name,
                type_id: newRow.accountType?.id,
              },
            },
            onCompleted: () => {
              enqueueSnackbar("Saved Successfully", {
                variant: "success",
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
              });
              setIsRowAdded(false);
            },
          });
        }
        break;
      }
    }
  };
  return { dispatch, isRowAdded };
};

type AddReceiptionAction = {
  type: "ADD_ACCOUNT";
};

type CancelReceiptionAction = {
  type: "CANCEL_ACCOUNT";
};

type SaveReceiptAction = {
  type: "SAVE_ACCOUNT";
};

export type Action =
  | AddReceiptionAction
  | CancelReceiptionAction
  | SaveReceiptAction;

type Variables = {
  input: AccountInput;
};
