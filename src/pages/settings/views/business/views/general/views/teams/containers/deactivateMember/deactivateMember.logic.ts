import { useSelectedOrganiztion } from "@/global/states/selectedOrganizations";
import { useTeams } from "../../hooks/useTeams";
import { useUpdateMemberutation } from "../../hooks/useUpdateMember";
import { useDeactivateMemberStore } from "./deactivateMember.store";
import { useOrganiaztion } from "@/shared/hooks/graphql/queries/useOrganization/useOrganization";

export const useLogic = () => {
  const selectedOrgId = useSelectedOrganiztion((state) => state.id);

  const { data: organization } = useOrganiaztion({ id: selectedOrgId });

  const { data: data } = useTeams({ first: 1000, page: 1 });

  const [mutateUpdateUser, { loading: loadingUpdateUser }] =
    useUpdateMemberutation();

  const memberIdToDeactivate = useDeactivateMemberStore((state) => state.id);

  const clear = useDeactivateMemberStore((state) => state.clear);

  const handleConfirmDeactivateUser = () => {
    memberIdToDeactivate &&
      mutateUpdateUser({
        variables: {
          id: parseInt(memberIdToDeactivate.toString()),
          isActive: false,
        },
      }).then(() => clear());
  };

  const handleCancelDeactivate = () => clear();

  const memberToDeactivateInfo = data?.users.data.find(
    (item) => item.id === memberIdToDeactivate
  );

  return {
    handleConfirmDeactivateUser,
    loadingUpdateUser,
    memberIdToDeactivate,
    handleCancelDeactivate,
    memberToDeactivateInfo,
    organization,
  };
};
