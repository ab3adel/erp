import React from "react";
import { useGenericMutation } from "@/shared";
import { saveAccount } from "../graphql/mutations/saveAccount";
import { AccountRow } from "../types";
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
                  (newRow.type as unknown as { value: number }).value || 1,
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
  input: AccountInput;
};

interface AccountInput {
  id?: number;
  name?: string;
  status?: string;
  subscription_type?: string;
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  currency?: string;
  district?: string;
  government_id?: string;
  language?: string;
  region?: string;
  zone?: string;
  state?: string;
  unit_of_measurement?: string;
  date_of_birth?: string;
  education_level?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  marital_status?: string;
  members_in_household?: number;
  read_literate?: string;
  write_literate?: string;
  total_children?: number;

  type_id?: number;
}
