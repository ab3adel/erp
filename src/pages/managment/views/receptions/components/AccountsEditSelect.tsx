import { useQuery } from "@apollo/client";
import { accountsNames } from "../graphql/queries/accountsNames";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid-pro";

export const AccountsEditSelect = (
  props: GridRenderCellParams<any, number>
) => {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();
  const { data } = useQuery<Accounts>(accountsNames);

  const handleChange = (e: SelectChangeEvent<number>) => {
    const account = data?.accounts.data.find(
      (account) => account.id === e.target.value
    );
    apiRef.current.setEditCellValue({ id, field, value: e.target.value });
    apiRef.current.updateRows([{ id, accountName: account?.attributes.name }]);
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
    <Select ref={handleRef} value={value} onChange={handleChange} fullWidth>
      {data?.accounts?.data?.map?.((account) => (
        <MenuItem key={account.id} value={account.id}>
          {account.attributes.name}
        </MenuItem>
      ))}
    </Select>
  );
};

type Accounts = {
  accounts: {
    data: Account[];
  };
};

type Account = {
  id: string;
  attributes: {
    name: string;
  };
};
