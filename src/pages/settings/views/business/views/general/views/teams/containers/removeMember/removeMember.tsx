import { FunctionComponent } from "react";
import RemoveMemberDialog from "../../components/RemoveMemberDialog";
import { useLogic } from "./removeMember.logic";

const RemoveMember: FunctionComponent = () => {
  const {
    organization,
    memberToDeleteInfo,
    handleConfirmDeleteUser,
    handleCancelDelete,
    loadingDeleting,
    memberIdToDelete,
  } = useLogic();

  return (
    <RemoveMemberDialog
      open={Boolean(memberIdToDelete)}
      confirmButtonProps={{
        onClick: handleConfirmDeleteUser,
        disabled: loadingDeleting,
      }}
      onCancelClick={handleCancelDelete}
      name={memberToDeleteInfo?.name ?? ""}
      email={memberToDeleteInfo?.email ?? ""}
      organization={organization?.organization?.company_name ?? ""}
    />
  );
};

export default RemoveMember;
