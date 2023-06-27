import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid-pro";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@apollo/client";
import { Account } from "@/shared/models/models";
import { citiesQuery } from "../graphql/queries/Cities";

export const CitiesEditSelect = (
  props: GridRenderCellParams<Account, Account["city"]>
) => {
  const [value, setValue] = useState(props.value);
  const apiRef = useGridApiContext();
  const { data } = useQuery<Response>(citiesQuery);

  const handleChange = (
    _: React.SyntheticEvent,
    newValue: { name: string; id: number } | null
  ) => {
    if (newValue) {
      setValue(newValue.name);
      apiRef.current.setEditCellValue({
        id: props.id,
        field: props.field,
        value: newValue.name,
      });
    }
  };

  return (
    <Autocomplete
      options={data?.cities.data || []}
      defaultValue={{ id: -1, name: value || "" }}
      getOptionLabel={(option) => option?.name || ""}
      onChange={handleChange}
      fullWidth
      renderInput={(params) => (
        <TextField {...params} title="" type="text" autoFocus fullWidth />
      )}
    />
  );
};

type Response = {
  cities: {
    data: { name: string; id: number }[];
  };
};
