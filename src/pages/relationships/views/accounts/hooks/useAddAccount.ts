import React from "react";
import { useGenericMutation } from "@/shared";
import { saveAccount } from "../graphql/mutations/saveAccount";
import { Account } from "../types";
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
        const row = ref.current.getRowModels().get("new") as Record<
          string,
          any
        >;
        if (row) {
          save({
            variables: {
              data: {
                completeness: row.completeness,
                district: row.district,
                firstName: row.firstName,
                govId: row.govrmentId as number,
                lastName: row.lastName,
                mobileNumber: row.mobileNumber,
                name: row.name,
                status: row.status,
                type: row.type,
              },
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
  data: Account["attributes"];
};
