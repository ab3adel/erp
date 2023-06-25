import { useNavigate } from "react-router-dom";
import { useActivateMemberStore } from "../activateMember/activateMember.store";

import { useTeams } from "../../hooks/useTeams";
import { useRemoveMemberStore } from "../removeMember/removeMember.store";
import { useDeactivateMemberStore } from "../deactivateMember/deactivateMember.store";

export const useLogic = () => {
  const navigate = useNavigate();

  const { data: data } = useTeams({ first: 1000, page: 1 });

  const handleNavigateToEditPermission = (module: string, id: number) =>
    navigate(`/settings/business/general/teams/edit/${id}#${module}`);

  const handleNavigateToEdit = (id: number) =>
    navigate("/settings/business/general/teams/edit/" + id);

  const handleActivateMember = useActivateMemberStore((state) => state.setId);

  const handleSetMemberToDelete = (id: number) => setMemberIdToDelete(id);

  const handleSetMemberToDeactivate = (id: number) =>
    setMemberIdTDeactivate(id);

  const setMemberIdToDelete = useRemoveMemberStore((state) => state.setId);

  const setMemberIdTDeactivate = useDeactivateMemberStore(
    (state) => state.setId
  );

  return {
    handleNavigateToEditPermission,
    handleNavigateToEdit,
    handleActivateMember,
    handleSetMemberToDelete,
    handleSetMemberToDeactivate,
    data,
  };
};
