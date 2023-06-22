import { FunctionComponent } from "react";
import { useLogic } from "./addOwner.logic";
import AddOwnerDialog from "../../components/AddOwnerDialog";

const AddOwner: FunctionComponent = () => {
  const {
    isOpen,
    handleConfirmAddOwner,
    isOwnerEmailValid,
    handleCancelAddOwner,
    loadingAddOwner,
    addOwnerEmail,
    handleEmailChange,
  } = useLogic();

  return (
    <>
      <AddOwnerDialog
        open={isOpen}
        confirmButtonProps={{
          onClick: handleConfirmAddOwner,
          disabled: !isOwnerEmailValid || loadingAddOwner,
        }}
        onCancelClick={handleCancelAddOwner}
        emailFieldProps={{
          value: addOwnerEmail,
          onChange: (e) => handleEmailChange(e.currentTarget.value),
        }}
      />
    </>
  );
};

export default AddOwner;
