import { Button } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useLogic } from "./EditAction.logic";

const EditAction = () => {
  const { handleTriggerEdit, rowsSelection, isInEditMode } = useLogic();

  return (
    <Button
      style={{ display: isInEditMode ? "none" : undefined }}
      variant="text"
      startIcon={<ModeEditOutlineOutlinedIcon />}
      disabled={rowsSelection.length !== 1}
      onClick={handleTriggerEdit}
    >
      Edit
    </Button>
  );
};

export default EditAction;
