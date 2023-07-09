import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import { useLogic } from "./DeleteAction.logic";

const DeleteAction: FunctionComponent = () => {
  const { handleSetIdList, rowsSelection, isInEditMode } = useLogic();

  return (
    <Button
      sx={{ display: isInEditMode ? "none" : undefined }}
      variant="text"
      startIcon={<DeleteIcon />}
      disabled={rowsSelection.length !== 1}
      onClick={handleSetIdList}
    >
      Delete
    </Button>
  );
};

export default DeleteAction;
