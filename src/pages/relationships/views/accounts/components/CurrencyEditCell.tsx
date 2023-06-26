import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid-pro";
import { TextField } from "@mui/material";
import { Account } from "@/shared/models/models";

export const CurrencyEditCell = (
  props: GridRenderCellParams<Account, string>
) => {
  const apiRef = useGridApiContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue) {
      apiRef.current.setEditCellValue({
        id: props.id,
        field: props.field,
        value: {
          ...(props.row.currency?.id && { id: props.row.currency.id }),
          name: newValue,
        },
      });
      apiRef.current.updateRows([
        {
          id: props.id,
          currency: {
            ...(props.row.currency?.id && { id: props.row.currency.id }),
            name: newValue,
          },
        },
      ]);
    }
  };

  return (
    <TextField
      autoFocus
      fullWidth
      defaultValue={props.row.currency?.name}
      onChange={handleChange}
    />
  );
};
