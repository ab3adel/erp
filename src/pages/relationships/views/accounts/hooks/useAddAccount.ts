import React from "react";
import { useGenericMutation } from "@/shared";
import { saveAccount } from "../graphql/mutations/saveAccount";
import { AccountInput, AccountRow } from "../types";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";

export const useAddAccount = (ref: React.MutableRefObject<GridApiPro>) => {
  const [isRowAdded, setIsRowAdded] = React.useState(false);
  const [save] = useGenericMutation<{ __typename: string }, Variables>(
    saveAccount,
    { refetchQueries: ["AccountsQuery"] }
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
        setIsRowAdded(true);
        break;
      }
      case "CANCEL_ACCOUNT":
        ref.current.updateRows([{ ...row, _action: "delete" }]);
        setIsRowAdded(false);
        break;
      case "SAVE_ACCOUNT": {
        const newRow = ref.current.getRowModels().get("new") as AccountRow;
        console.log(newRow);
        if (newRow) {
          const { id, ...data } = newRow;
          save({
            variables: {
              input: {
                name: data.name,
                address1: data.address1 || "",
                district: data.district,
                first_name: data.firstName,
                last_name: data.lastName,
                type_id:
                  (newRow.type as unknown as { value: number }).value || 0,
              },
            },
            onCompleted: () => {
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
