import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid-pro";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@apollo/client";
import { Account } from "@/shared/models/models";
import { currenciesQuery } from "../graphql/queries/Currencies";

export const CurrencyEditCell = (
  props: GridRenderCellParams<Account, Account["currency"]>
) => {
  const [value, setValue] = useState(props.value);
  const apiRef = useGridApiContext();
  const { data } = useQuery<Response>(currenciesQuery);

  const handleChange = (
    _: React.SyntheticEvent,
    newValue: Account["currency"] | null
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
          currency: newValue,
        },
      ]);
    }
  };

  return (
    <Autocomplete
      options={data?.currencies.data || []}
      value={value}
      getOptionLabel={(option: Account["currency"]) => option?.name || ""}
      onChange={handleChange}
      fullWidth
      renderInput={(params) => (
        <TextField {...params} title="" type="text" autoFocus fullWidth />
      )}
    />
  );
};

type Response = {
  currencies: {
    data: Account["currency"][];
  };
};
