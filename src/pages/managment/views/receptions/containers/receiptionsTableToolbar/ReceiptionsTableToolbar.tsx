import { GridToolbarContainer, GridToolbarProps } from "@mui/x-data-grid-pro";
import { Divider } from "@mui/material";
import { Action } from "../../types";
import DeleteAction from "./deleteAction/DeleteAction";
import ApprovePendingLotesAction from "./approvePendingLotsAction/ApprovePendingLotsAction";
import CustomizeColumns from "./customizeColumns/CustomizeColumns";
import TagAction from "./tagAction/TagAction";
import ExportActions from "./exportAction/ExportAction";
import EditAction from "./editAction/EditAction";
import InsertUpdateAction from "./insertUpdateAction/InsertUpdateAction";

export const ReceiptionsTableToolbar = (
  props: ReceiptionsTableToolbarProps
) => {
  const { rowsSelection, isRowAdded } = props;

  return (
    <GridToolbarContainer sx={{ justifyContent: "end", m: 2 }}>
      {rowsSelection.length > 0 && !isRowAdded && <ApprovePendingLotesAction />}
      {rowsSelection.length > 0 && !isRowAdded && <DeleteAction />}
      {rowsSelection.length > 0 && !isRowAdded && <TagAction />}
      {rowsSelection.length > 0 && !isRowAdded && <EditAction />}
      <InsertUpdateAction />
      <Divider orientation="vertical" />

      <ExportActions />
      <CustomizeColumns />
    </GridToolbarContainer>
  );
};

type ReceiptionsTableToolbarProps = GridToolbarProps & {
  rowsSelection: string[];
  dispatch: (action: Action) => void;
  isRowAdded: boolean;
};
