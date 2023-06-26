import { DialogActionsProps } from "@/shared/components/General-Dialog/DialogActions";
import GeneralDialog, {
  GeneralDialogProps,
} from "@/shared/components/General-Dialog/GeneralDialog";
import DateRangePicker, {
  DateRangePickerProps,
} from "@/shared/components/dateRangePicker/DateRangePicker";
import { FunctionComponent } from "react";

interface DateRangePickerDialogProps
  extends Pick<DialogActionsProps, "confirmButtonProps" | "onCancelClick">,
    Pick<DateRangePickerProps, "onChange" | "value">,
    Pick<GeneralDialogProps, "open"> {}

const DateRangePickerDialog: FunctionComponent<DateRangePickerDialogProps> = (
  props
) => {
  const { confirmButtonProps, onCancelClick, onChange, value, open } = props;

  return (
    <GeneralDialog
      open={open}
      dialogContentContainerProps={{
        sx: { paddingBlock: 0, paddingInline: "8px !important" },
      }}
      actionsProps={{
        confirmButtonProps: { ...confirmButtonProps, children: "Apply" },
        onCancelClick,
      }}
    >
      <DateRangePicker onChange={onChange} value={value} />
    </GeneralDialog>
  );
};

export default DateRangePickerDialog;
