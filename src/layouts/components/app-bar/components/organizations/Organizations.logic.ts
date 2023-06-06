import React from "react";

export const useLogic = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleSetAnchorEl = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => setAnchorEl(null);

  return { anchorEl, handleSetAnchorEl, handleCloseMenu };
};
