import { useCheckMode } from "../../../hooks/useCheckMode";
import { useApprovePendingLotsStore } from "../../approveLots/ApproveLots.store";
import {
  gridRowSelectionStateSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid-pro";

export const useLogic = () => {
  const setApproveIdList = useApprovePendingLotsStore(
    (state) => state.setIdList
  );

  const apiRef = useGridApiContext();

  const rowsSelection = useGridSelector(apiRef, gridRowSelectionStateSelector);

  const { isInEditMode } = useCheckMode();

  const handleSetIdList = () =>
    setApproveIdList(rowsSelection.map((item) => Number(item)));

  return { handleSetIdList, isInEditMode };
};
