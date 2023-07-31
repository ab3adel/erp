import { useDeletePendingLotsMutation } from "@/shared/hooks/graphql/mutation/deletePendingLots/useDeletePendingLots";
import { useDeletePendingLotsStore } from "./DeleteLots.store";
import { enqueueSnackbar } from "notistack";
import {Close} from '@mui/icons-material'
export const useLogic = () => {
  const idList = useDeletePendingLotsStore((state) => state.idList);

  const clearIdList = useDeletePendingLotsStore((state) => state.clearList);

  const [mutateRemoveLots, { loading }] = useDeletePendingLotsMutation();

  const handleConfirmDelete = () => {
    mutateRemoveLots({ variables: { lotIds: idList } }).then((resp) => {
      enqueueSnackbar({
        message: <>{resp.data?.DeletePendingLots} Receptions have been deleted
        <span style={{margin:'0 5px',color:'#33A4A5',cursor:'pointer'}}> Undo </span>
        <Close sx={{color:'white',cursor:'pointer'}}/>
        </>,
        anchorOrigin: { horizontal: "center", vertical: "bottom" },
      });
      clearIdList();
    });
  };

  return { idList, clearIdList, loading, handleConfirmDelete };
};
