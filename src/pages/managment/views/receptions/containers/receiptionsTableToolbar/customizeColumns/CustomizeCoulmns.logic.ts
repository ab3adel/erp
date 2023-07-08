import {
  gridColumnDefinitionsSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid-pro";
import { useEffect, useState } from "react";

export const useLogic = () => {
  const apiRef = useGridApiContext();

  const columns = useGridSelector(apiRef, gridColumnDefinitionsSelector);

  const [visibilityModel, setVisibilityModel] = useState({});

  const [showColumnsPanel, setShowColumnsPanel] = useState(false);

  const handleClose = () => setShowColumnsPanel(false);

  const handleOpen = () => setShowColumnsPanel(true);

  const handleSetColumnsOrder = (fields: string[]) =>
    fields.forEach((field, index) =>
      apiRef.current.setColumnIndex(field, index + 1)
    );

  //change visibility
  useEffect(() => {
    apiRef.current.setColumnVisibilityModel(visibilityModel);
  }, [apiRef, visibilityModel]);

  const mapColumnsToGroups = columns
    .filter((item) => item.field !== "__check__")
    .map((item) => ({
      field: item.field,
      headerName: item.headerName,
      group: (item as any).group,
    }));

  return {
    mapColumnsToGroups,
    showColumnsPanel,
    handleClose,
    handleOpen,
    setVisibilityModel,
    visibilityModel,
    handleSetColumnsOrder,
  };
};
