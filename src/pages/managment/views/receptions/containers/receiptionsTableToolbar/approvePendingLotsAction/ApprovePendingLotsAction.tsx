import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useLogic } from "./ApprovePendingLotsAction.logic";

const ApprovePendingLotesAction = () => {
  const { handleSetIdList } = useLogic();
  return (
    <Button variant="text" startIcon={<CheckIcon />} onClick={handleSetIdList}>
      Approve
    </Button>
  );
};

export default ApprovePendingLotesAction;
