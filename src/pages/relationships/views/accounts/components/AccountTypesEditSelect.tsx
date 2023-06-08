import { useQuery } from "@apollo/client";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid-pro";
import { accountTypes } from "../graphql/queries/AccountTypesQuery";

export const AccountTypesEditSelect = (
  props: GridRenderCellParams<any, number>
) => {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();
  const { data } = useQuery<AccountTypes>(accountTypes);

  const handleChange = (e: SelectChangeEvent<number>) => {
    const account = data?.accountTypes.data.find(
      (type) => type.id === e.target.value
    );
    apiRef.current.setEditCellValue({
      id,
      field,
      value: {
        category: account?.category,
        value: e.target.value,
      },
    });
    apiRef.current.updateRows([{ id, type: e.target.value }]);
  };

  const handleRef = (element: HTMLSpanElement) => {
    if (element) {
      const input = element.querySelector<HTMLInputElement>(
        `input[value="${value}"]`
      );
      input?.focus();
    }
  };

  return (
    <Select
      ref={handleRef}
      defaultValue={value}
      onChange={handleChange}
      fullWidth
    >
      {data?.accountTypes?.data?.map?.((type) => (
        <MenuItem key={type.id} value={type.id}>
          {type.name}
        </MenuItem>
      ))}
    </Select>
  );
};

type AccountTypes = {
  accountTypes: {
    data: Type[];
  };
};

type Type = {
  category: string;
  id: string;
  name: string;
};
