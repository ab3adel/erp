import TableSaveCancelActions from "@/shared/components/tableSaveCancelActions/TableSaveCancelActions";
import { useLogic } from "./insertUpdateAction.logic";

const InsertUpdateAction = () => {
  const { isInEditMode, handleCancel, handleConfirm } = useLogic();

  return isInEditMode ? (
    <TableSaveCancelActions
      cancelProps={{ onClick: handleCancel }}
      ConfirmProps={{ onClick: handleConfirm }}
    />
  ) : (
    <></>
  );
};

export default InsertUpdateAction;
