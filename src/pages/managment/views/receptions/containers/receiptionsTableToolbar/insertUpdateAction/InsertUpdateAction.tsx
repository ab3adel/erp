import TableSaveCancelActions from "@/shared/components/tableSaveCancelActions/TableSaveCancelActions";
import { useLogic } from "./insertUpdateAction.logic";

const InsertUpdateAction = () => {
  const { isInEditMode, handleCancel } = useLogic();

  return isInEditMode ? (
    <TableSaveCancelActions cancelProps={{ onClick: handleCancel }} />
  ) : (
    <></>
  );
};

export default InsertUpdateAction;
