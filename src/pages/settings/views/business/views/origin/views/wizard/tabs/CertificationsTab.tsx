import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid-pro";
import Section from "../../../components/Section";
import DataGrid, { cellCheckBox } from "../components/EditableDatagrid";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";

const columns: GridColDef[] = [
  {
    headerName: "Certification",
    field: "cert",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Whatsapp Code",
    field: "code",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Active",
    field: "active",
    flex: 1,
    sortable: false,
    renderCell: cellCheckBox,
  },
];

const rows = [
  { id: "1", cert: "Fairtrade", code: "F" },
  { id: "2", cert: "Organic", code: "O" },
  { id: "3", cert: "C.A.F.E. Practices (Starbucks)", code: "C" },
  { id: "4", cert: "4C", code: "4" },
  { id: "5", cert: "Rainforest Alliance", code: "R" },
  { id: "6", cert: "Bird Friendly", code: "B" },
];

const Tab = ({
  datagridRef,
}: {
  datagridRef?: React.MutableRefObject<GridApiPro> | undefined;
}) => {
  return (
    <Box>
      <Typography variant="h6" mb={3}>
        What certifications do you currently have?
      </Typography>
      <Section
        title="Coffee Certifications"
        headline="Select Your Certifications"
        subheadline="Activate and add certifications that are relevant to your operations. Use the Whatsapp Code as a prefix to the grade when entering a reception via Whatsapp."
      >
        <DataGrid columns={columns} rows={rows} />
      </Section>
    </Box>
  );
};

export default Tab;
