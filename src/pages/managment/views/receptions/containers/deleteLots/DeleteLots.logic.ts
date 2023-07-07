import { useDeletePendingLotsMutation } from "@/shared/hooks/graphql/mutation/deletePendingLots/useDeletePendingLots";
import { useAddOwnerStore } from "./DeleteLots.store";
import { enqueueSnackbar } from "notistack";

export const useLogic = () => {
  const idList = useAddOwnerStore((state) => state.idList);

  const clearIdList = useAddOwnerStore((state) => state.clearList);

  const [mutateRemoveLots, { loading }] = useDeletePendingLotsMutation();

  const handleConfirmDelete = () => {
    mutateRemoveLots({ variables: { lotIds: idList } }).then((resp) => {
      enqueueSnackbar({
        message: `${resp.data?.DeletePendingLots} Receptions have been deleted`,
        anchorOrigin: { horizontal: "center", vertical: "bottom" },
      });
      clearIdList();
    });
  };

  return { idList, clearIdList, loading, handleConfirmDelete };
};
