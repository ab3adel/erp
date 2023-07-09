import { useState } from "react";

export const useLogic = () => {
  const [anchorEl, setAnchorEl] = useState<undefined | HTMLElement>(undefined);

  const clearAnchor = () => setAnchorEl(undefined);

  return { anchorEl, setAnchorEl, clearAnchor };
};
