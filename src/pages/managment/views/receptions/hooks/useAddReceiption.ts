import { DataGridRow } from "../types";
import React from "react";
import { useGenericMutation } from "@/shared";
import { saveReceiption } from "../graphql/mutations/saveReceiption";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";

export const useAddReceiption = (ref: React.MutableRefObject<GridApiPro>) => {
  const [isRowAdded, setIsRowAdded] = React.useState(false);
  const [save] = useGenericMutation<{ __typename: string }, Variables>(
    saveReceiption,
    { refetchQueries: ["ReceptionsQuery"] }
  );

  const dispatch = (action: Action) => {
    const row: Partial<DataGridRow> = { id: "new" };
    switch (action.type) {
      case "ADD_RECEIPTION": {
        ref.current.updateRows([row]);
        setIsRowAdded(true);
        break;
      }
      case "CANCEL_RECEIPTION":
        ref.current.updateRows([{ ...row, _action: "delete" }]);
        setIsRowAdded(false);
        break;
      case "SAVE_RECEIPTION": {
        const row = ref.current.getRowModels().get("new") as DataGridRow;
        if (row) {
          save({
            variables: {
              data: {
                date: row.receptionDate.toISOString().split("T")[0],
                status: row.status,
                totalCost: row.totalCost,
                payment: row.payment,
                comission: row.commission,
                cherryPrice: row.cherry_price,
                currecnyFixed: row.currency_fixed,
                account: row.accountId,
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
  type: "ADD_RECEIPTION";
};

type CancelReceiptionAction = {
  type: "CANCEL_RECEIPTION";
};

type SaveReceiptAction = {
  type: "SAVE_RECEIPTION";
};

type Action = AddReceiptionAction | CancelReceiptionAction | SaveReceiptAction;

type Variables = {
  data: {
    date: string;
    status: string;
    totalCost: number;
    payment: boolean;
    comission: number;
    cherryPrice: number;
    currecnyFixed: string;
    account: string;
  };
};
