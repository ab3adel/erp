import { useCheckMode } from "../../../hooks/useCheckMode";
import { useDeletePendingLotsStore } from "../../deleteLots/DeleteLots.store";
import {
  gridRowSelectionStateSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid-pro";

export const useLogic = () => {
  const setDeleteIdList = useDeletePendingLotsStore((state) => state.setIdList);

  const apiRef = useGridApiContext();

  const rowsSelection = useGridSelector(apiRef, gridRowSelectionStateSelector);

  const { isInEditMode } = useCheckMode();

  const handleSetIdList = () =>
    setDeleteIdList(rowsSelection.map((item) => Number(item)));

  return { rowsSelection, handleSetIdList, isInEditMode };
};
