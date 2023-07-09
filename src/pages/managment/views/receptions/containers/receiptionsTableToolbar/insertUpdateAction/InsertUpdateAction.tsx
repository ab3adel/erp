import TableSaveCancelActions from "@/shared/components/tableSaveCancelActions/TableSaveCancelActions";
import { useLogic } from "./insertUpdateAction.logic";

const InsertUpdateAction = () => {
  const { isInEditMode } = useLogic();

  return isInEditMode && <TableSaveCancelActions />;
};

export default InsertUpdateAction;
