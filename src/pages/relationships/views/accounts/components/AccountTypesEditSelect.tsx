import { useQuery } from "@apollo/client";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid-pro";
import { accountTypes } from "../graphql/queries/AccountTypesQuery";
import { Account } from "@/shared/models/models";

export const AccountTypesEditSelect = (
  props: GridRenderCellParams<Account, Account["accountType"]>
) => {
  const { id, value, field, row } = props;
  const apiRef = useGridApiContext();
  const { data } = useQuery<AccountTypes>(accountTypes);

  const handleChange = (e: SelectChangeEvent<number>) => {
    const accountType = data?.accountTypes.data.find(
      (type) => type.id === e.target.value
    );
    apiRef.current.setEditCellValue({
      id,
      field,
      value: accountType,
    });
    apiRef.current.updateRows([
      {
        id,
        accountType,
      },
    ]);
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
      value={row.accountType?.id}
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
