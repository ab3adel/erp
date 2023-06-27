import { uniqueId } from "lodash";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { useOriginSettingGetter } from "../../../hooks/states";

const columns: GridColDef[] = [
  {
    headerName: "Our Words",
    field: "coffee_state",
    sortable: false,
    flex: 2,
  },
  {
    headerName: "Your Words",
    field: "label",
    sortable: false,
    flex: 2,
  },
  {
    headerName: "Sub-Type/Grade",
    field: "grades",
    sortable: false,
    flex: 3,
    valueFormatter: (params) => params.value.join(", "),
  },
  {
    headerName: "Locations",
    field: "locations",
    sortable: false,
    flex: 3,
    valueFormatter: (params) => params.value.join(", "),
  },
];

const CoffeeTermsTable = () => {
  const rows = useOriginSettingGetter(
    "coffee_terms",
    "main",
    (payload: Record<string, any>[]) =>
      payload?.map((row) => ({
        ...row,
        id: uniqueId(),
      }))
  );

  return (
    <DataGridPro
      sx={{
        overflowX: "scroll",
        "& .MuiDataGrid-row:last-child > *": {
          border: "none",
        },
      }}
      rowHeight={80}
      columns={columns}
      disableRowSelectionOnClick
      hideFooter
      rows={(rows as []) || []}
    />
  );
};
export default CoffeeTermsTable;
