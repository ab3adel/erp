import {
  gridRowSelectionStateSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid-pro";
import { useCheckMode } from "../../../hooks/useCheckMode";

export const useLogic = () => {
  const apiRef = useGridApiContext();

  const rowsSelection = useGridSelector(apiRef, gridRowSelectionStateSelector);

  const { isInEditMode } = useCheckMode();

  const handleTriggerEdit = () => {
    apiRef.current.startRowEditMode({ id: Number(rowsSelection[0]) });
  };

  return { handleTriggerEdit, rowsSelection, isInEditMode };
};
