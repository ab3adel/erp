import { useQuery } from "@apollo/client";
import { Box, IconButton, MenuItem, Select } from "@mui/material";
import { accountTypes } from "../graphql/queries/AccountTypesQuery";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export const AccountTypesSelect = ({
  setTypeId,
  typeId,
}: {
  typeId: number;
  setTypeId: (value: number) => void;
}) => {
  const { data } = useQuery<AccountTypes>(accountTypes);
  const [typeState, setTypeState] = useState(typeId);

  return (
    <Box display="flex" alignItems="center" width="100%">
      <Select
        value={typeState}
        onChange={(e) => {
          setTypeId(Number(e.target.value));
          setTypeState(Number(e.target.value));
        }}
        fullWidth
        variant="standard"
        sx={{
          "&::before, &::after": {
            borderBottom: "none !important",
          },
        }}
      >
        {data?.accountTypes?.data?.map?.((type) => (
          <MenuItem key={type.id} value={type.id}>
            {type.name}
          </MenuItem>
        ))}
      </Select>
      {typeState !== 0 && (
        <IconButton
          onClick={() => {
            setTypeId(0);
            setTypeState(0);
          }}
        >
          <CloseIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </IconButton>
      )}
    </Box>
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
