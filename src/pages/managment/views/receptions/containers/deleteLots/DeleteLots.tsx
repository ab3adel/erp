import { FunctionComponent } from "react";
import DeleteReceiptions from "../../components/DeleteReceiptions/DeleteReceiptions";

import { useLogic } from "./DeleteLots.logic";

const DeleteLots: FunctionComponent = () => {
  const { idList, clearIdList, loading, handleConfirmDelete } = useLogic();

  return (
    <DeleteReceiptions
      open={idList.length > 0}
      numberToDelete={idList.length}
      onCancelClick={clearIdList}
      confirmButtonProps={{ disabled: loading, onClick: handleConfirmDelete }}
    />
  );
};

export default DeleteLots;
