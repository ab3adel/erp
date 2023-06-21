import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid-pro";
import Section from "../../../components/Section";
import DataGrid, { CellTextField } from "../components/EditableDatagrid";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";

const columns: GridColDef[] = [
  {
    headerName: "Process Method",
    field: "pm",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Cherry to Wet %",
    field: "ctw",
    flex: 1,
    sortable: false,
    renderCell: (params) => <CellTextField params={params} label={"Enter %"} />,
  },
  {
    headerName: "Wet to Dry %",
    field: "wtd",
    flex: 1,
    sortable: false,
    renderCell: (params) => <CellTextField params={params} label={"Enter %"} />,
  },
  {
    headerName: "Dry to Green %",
    field: "dtg",
    flex: 1,
    sortable: false,
    renderCell: (params) => <CellTextField params={params} label={"Enter %"} />,
  },
  {
    headerName: "Total %",
    field: "total",
    width: 88,
    sortable: false,
    align: "center",
  },
];

const rows = [
  { id: "1", pm: "Natural", ctw: 100, wtd: 40, dtg: 40, total: 16 },
  { id: "2", pm: "Processing Method 2", total: 0 },
  { id: "3", pm: "Processing Method 3", total: 0 },
  { id: "4", pm: "Processing Method 4", total: 0 },
  { id: "5", pm: "Processing Method 5", total: 0 },
];

const Tab = ({
  datagridRef,
}: {
  datagridRef?: React.MutableRefObject<GridApiPro> | undefined;
}) => {
  return (
    <Box>
      <Typography variant="h6" mb={3}>
        What are your yield estimations?
      </Typography>
      <Section
        title="Processing Method Yield"
        headline="Configure Yield Estimations"
        subheadline="These are your yield estimations for the processing methods you specified previously"
        example={[
          "“Wet” = Wet Parchment",
          "”Dry” = Dry Cherry or Dry Parchment",
          "”Green” = Green or Exportable Green",
        ]}
      >
        <DataGrid columns={columns} rows={rows} />
      </Section>
    </Box>
  );
};

export default Tab;
