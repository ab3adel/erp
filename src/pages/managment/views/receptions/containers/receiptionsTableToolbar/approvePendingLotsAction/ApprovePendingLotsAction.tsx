import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useLogic } from "./ApprovePendingLotsAction.logic";

const ApprovePendingLotesAction = () => {
  const { handleSetIdList, isInEditMode } = useLogic();
  return (
    <Button
      sx={{ display: isInEditMode ? "none" : undefined }}
      variant="text"
      startIcon={<CheckIcon />}
      onClick={handleSetIdList}
    >
      Approve
    </Button>
  );
};

export default ApprovePendingLotesAction;
