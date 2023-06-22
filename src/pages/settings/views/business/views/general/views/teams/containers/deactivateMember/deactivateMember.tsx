import { FunctionComponent } from "react";
import DeactivateMemberDialog from "../../components/DeactivateMemberDialog";
import { useLogic } from "./deactivateMember.logic";

const DeactivateMember: FunctionComponent = () => {
  const {
    handleConfirmDeactivateUser,
    loadingUpdateUser,
    memberIdToDeactivate,
    handleCancelDeactivate,
    memberToDeactivateInfo,
    organization,
  } = useLogic();

  return (
    <DeactivateMemberDialog
      open={Boolean(memberIdToDeactivate)}
      onCancelClick={handleCancelDeactivate}
      confirmButtonProps={{
        onClick: handleConfirmDeactivateUser,
        disabled: loadingUpdateUser,
      }}
      name={memberToDeactivateInfo?.name ?? ""}
      organization={organization?.organization?.company_name ?? ""}
    />
  );
};

export default DeactivateMember;
