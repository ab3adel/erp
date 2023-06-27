import { useQuery } from "@apollo/client";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid-pro";
import { Account } from "@/shared/models/models";
import { accountFarmSizeUoMs } from "../graphql/queries/AccountsFarmSizeUoMs";

export const AccountFarmSizeUoMEditSelect = (
  props: GridRenderCellParams<Account, Account["farmSizeUom"]>
) => {
  const { id, value, field, row } = props;
  const apiRef = useGridApiContext();
  const { data } = useQuery<Response>(accountFarmSizeUoMs);

  const handleChange = (e: SelectChangeEvent<number>) => {
    const farmSizeUoM = data?.farmSizeUoms.data.find(
      (type) => type.id === e.target.value
    );
    apiRef.current.setEditCellValue({
      id,
      field,
      value: farmSizeUoM,
    });
    apiRef.current.updateRows([
      {
        id,
        farmSizeUom: farmSizeUoM,
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
      defaultValue={row.farmSizeUom?.id}
      onChange={handleChange}
      fullWidth
    >
      {data?.farmSizeUoms?.data?.map?.((data) => (
        <MenuItem key={data.id} value={data.id}>
          {data.name}
        </MenuItem>
      ))}
    </Select>
  );
};

type Response = {
  farmSizeUoms: {
    data: UoM[];
  };
};

type UoM = {
  id: string;
  name: string;
};
