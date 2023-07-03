import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid-pro";
import { Account } from "@/shared/models/models";
import { DatePicker } from "@mui/x-date-pickers";

export const BirthdateEditCell = (
  props: GridRenderCellParams<Account, Account["city"]>
) => {
  const apiRef = useGridApiContext();

  const handleChange = (value?: string) => {
    apiRef.current.setEditCellValue({
      id: props.id,
      field: props.field,
      value,
    });
  };

  return (
    <DatePicker
      slotProps={{
        textField: {
          variant: "standard",
        },
      }}
      views={["year"]}
      onChange={(value) => {
        const dataValue = value as { $y?: number };
        handleChange(String(dataValue?.$y));
      }}
    />
  );
};
