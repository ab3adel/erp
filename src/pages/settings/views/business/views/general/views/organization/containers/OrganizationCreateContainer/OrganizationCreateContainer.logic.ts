import React from "react";

export const useLogic = () => {
  const [showDialog, setShowDialog] = React.useState(false);

  const handleShowDialog = () => setShowDialog(true);

  const handleClose = () => setShowDialog(false);
  return { showDialog, handleShowDialog, handleClose };
};
