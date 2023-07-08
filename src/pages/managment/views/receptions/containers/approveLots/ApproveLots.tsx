import ApproveReceiptions from "../../components/ApproveReceiptions/ApproveReceiptions";
import { useLogic } from "./ApprovedLots.logic";

const ApproveLots = () => {
  const { clearIdList, idList, form, loading } = useLogic();
  return (
    <ApproveReceiptions
      open={idList.length > 0}
      type={idList.length === 1 ? "single" : "selection"}
      onCancelClick={clearIdList}
      approveAndCombineProps={{
        value: form.values["combined"],
        name: "combined",
        onChange: form.handleChange,
      }}
      withCombine={form.values.combined}
      confirmButtonProps={{
        onClick: form.submitForm,
        disabled: !form.isValid || loading,
      }}
      textfieldProps={{
        value: form.values["name"],
        name: "name",
        onChange: form.handleChange,
        error: !!form.errors.name,
        helperText: form.errors.name,
      }}
    />
  );
};

export default ApproveLots;