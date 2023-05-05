import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { DataGridRow } from "../types";
import React from "react";

export const useAddReceiption = (
  ref: React.MutableRefObject<GridApiCommunity>
) => {
  const [isRowAdded, setIsRowAdded] = React.useState(false);

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
      case "SAVE_RECEIPTION":
        break;
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
