import {
  gridRowSelectionStateSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid-pro";
import { useCheckMode } from "../../../hooks/useCheckMode";

export const useLogic = () => {
  const { isInEditMode } = useCheckMode();

  const apiRef = useGridApiContext();

  const rowsSelection = useGridSelector(apiRef, gridRowSelectionStateSelector);

  const handleCancel = () => {
    apiRef.current.stopRowEditMode({
      id: Number(rowsSelection[0]),
    });
  };

  return { isInEditMode, handleCancel };
};
