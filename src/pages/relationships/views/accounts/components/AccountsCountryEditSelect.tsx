import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid-pro";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { countriesQuery } from "../graphql/queries/Countries";
import { useQuery } from "@apollo/client";
import { Account } from "@/shared/models/models";

export const AccountsCountryEditSelect = (
  props: GridRenderCellParams<Account, Account["country"]>
) => {
  const [value, setValue] = useState(props.value);
  const apiRef = useGridApiContext();
  const { data } = useQuery<Response>(countriesQuery);

  const handleChange = (
    _: React.SyntheticEvent,
    newValue: Account["country"] | null
  ) => {
    if (newValue) {
      setValue(newValue);
      apiRef.current.setEditCellValue({
        id: props.id,
        field: props.field,
        value: newValue,
      });
      apiRef.current.updateRows([
        {
          id: props.id,
          country: newValue,
        },
      ]);
    }
  };

  return (
    <Autocomplete
      options={data?.countries.data || []}
      value={value}
      getOptionLabel={(option: Account["country"]) => option?.name || ""}
      onChange={handleChange}
      fullWidth
      renderInput={(params) => (
        <TextField {...params} title="" type="text" autoFocus fullWidth />
      )}
    />
  );
};

type Response = {
  countries: {
    data: Account["country"][];
  };
};
