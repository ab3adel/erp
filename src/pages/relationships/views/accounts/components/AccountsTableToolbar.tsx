import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

export const AccountsTableToolbar = () => {
  return (
    <GridToolbarContainer sx={{ justifyContent: "end", m: 2 }}>
      <GridToolbarExport variant="text" />
      <GridToolbarColumnsButton variant="text" />
    </GridToolbarContainer>
  );
};
