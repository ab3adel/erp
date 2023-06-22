import { useCallback, useEffect } from "react";
import { useUpdateMemberutation } from "../../hooks/useUpdateMember";
import { useActivateMemberStore } from "./activateMember.store";

export const useLogic = () => {
  const [mutateUpdateUser, { loading: loadingUpdateUser }] =
    useUpdateMemberutation();

  const id = useActivateMemberStore((state) => state.id);

  const clear = useActivateMemberStore((state) => state.clear);

  const handleActivateMember = useCallback(
    (id: number) =>
      mutateUpdateUser({
        variables: {
          id: parseInt(id.toString()),
          isActive: true,
        },
      }).then(() => clear()),
    [clear, mutateUpdateUser]
  );

  useEffect(() => {
    if (id) {
      handleActivateMember(id);
    }
  }, [id, handleActivateMember]);
};
