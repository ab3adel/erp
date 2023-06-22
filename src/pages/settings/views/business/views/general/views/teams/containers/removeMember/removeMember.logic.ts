import { useSelectedOrganiztion } from "@/global/states/selectedOrganizations";
import { useOrganiaztion } from "@/shared/hooks/graphql/queries/useOrganization/useOrganization";
import { useDeleteUserMutation } from "../../hooks/useDeleteUserMutation";
import { useTeams } from "../../hooks/useTeams";
import { useRemoveMemberStore } from "./removeMember.store";

export const useLogic = () => {
  const { data: data } = useTeams({ first: 1000, page: 1 });

  const memberIdToDelete = useRemoveMemberStore((state) => state.id);

  const clear = useRemoveMemberStore((state) => state.clear);

  const selectedOrgId = useSelectedOrganiztion((state) => state.id);

  const { data: organization } = useOrganiaztion({ id: selectedOrgId });

  const memberToDeleteInfo = data?.users.data.find(
    (item) => item.id === memberIdToDelete
  );

  const handleConfirmDeleteUser = () => {
    memberIdToDelete &&
      mutateDeleteUser({
        variables: { id: parseInt(memberIdToDelete.toString()) },
      }).then(() => clear());
  };

  const handleCancelDelete = () => clear();

  const [mutateDeleteUser, { loading: loadingDeleting }] =
    useDeleteUserMutation();

  return {
    organization,
    memberToDeleteInfo,
    handleConfirmDeleteUser,
    handleCancelDelete,
    loadingDeleting,
    memberIdToDelete,
  };
};
