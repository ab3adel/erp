import { useQuery } from "@apollo/client";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid-pro";
import { Account } from "@/shared/models/models";
import { accountFarmSpacingUoMs } from "../graphql/queries/AccountsFarmSpacingUoMs";

export const AccountFarmSpacingUoMEditSelect = (
  props: GridRenderCellParams<Account, Account["farmSizeUom"]>
) => {
  const { id, value, field, row } = props;
  const apiRef = useGridApiContext();
  const { data } = useQuery<Response>(accountFarmSpacingUoMs);

  const handleChange = (e: SelectChangeEvent<number>) => {
    const farmSpacingUoM = data?.farmSpacingUoms.data.find(
      (type) => type.id === e.target.value
    );
    apiRef.current.setEditCellValue({
      id,
      field,
      value: farmSpacingUoM,
    });
    apiRef.current.updateRows([
      {
        id,
        farmSpacingUom: farmSpacingUoM,
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
      {data?.farmSpacingUoms?.data?.map?.((data) => (
        <MenuItem key={data.id} value={data.id}>
          {data.name}
        </MenuItem>
      ))}
    </Select>
  );
};

type Response = {
  farmSpacingUoms: {
    data: UoM[];
  };
};

type UoM = {
  id: string;
  name: string;
};
