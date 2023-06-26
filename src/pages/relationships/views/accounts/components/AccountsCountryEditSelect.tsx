import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid-pro";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const countries = ["USA", "Canada", "Australia", "Germany", "Japan", "India"];

export const AccountsCountryEditSelect = (
  props: GridRenderCellParams<any, string>
) => {
  const [value, setValue] = useState(props.value);
  const apiRef = useGridApiContext();

  const handleChange = (_: React.SyntheticEvent, newValue: string | null) => {
    if (newValue) {
      setValue(newValue);
      apiRef.current.setEditCellValue({
        id: props.id,
        field: props.field,
        value: {
          id: 1,
          name: newValue,
        },
      });
      apiRef.current.updateRows([
        {
          id: props.id,
          country: {
            id: 1,
            name: newValue,
          },
        },
      ]);
    }
  };

  return (
    <Autocomplete
      options={countries}
      value={value}
      onChange={handleChange}
      fullWidth
      renderInput={(params) => (
        <TextField {...params} title="" type="text" autoFocus fullWidth />
      )}
    />
  );
};
