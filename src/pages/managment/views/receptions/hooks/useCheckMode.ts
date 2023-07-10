import {
  gridRowSelectionStateSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid-pro";

export const useCheckMode = () => {
  const apiRef = useGridApiContext();

  const rowsSelection = useGridSelector(apiRef, gridRowSelectionStateSelector);

  const mode = apiRef.current.getCellMode(rowsSelection[0], "grade");

  const isInEditMode = mode === "edit";

  return { isInEditMode };
};
