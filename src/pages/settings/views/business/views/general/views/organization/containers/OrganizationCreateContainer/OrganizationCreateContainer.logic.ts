import React from "react";

export const useLogic = () => {
  const [showDialog, setShowDialog] = React.useState(false);

  const handleShowDialog = () => setShowDialog(true);

  const handleClose = () => setShowDialog(false);

  const messageToSend =
    "Hello There i need to add new organization, Can you spport me creating new one?";

  const handleContactUsClicked = () => {
    window.open(
      "https://api.whatsapp.com/send?phone=" +
        import.meta.env.VITE_CONTACT_PHONE +
        "&text=" +
        encodeURIComponent(messageToSend),
      "_blank"
    );
    console.log(
      "https://api.whatsapp.com/send?phone=" +
        import.meta.env.VITE_CONTACT_PHONE
    );
    setShowDialog(false);
  };

  return { showDialog, handleShowDialog, handleClose, handleContactUsClicked };
};
