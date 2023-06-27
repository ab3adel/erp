import { Box, Typography } from "@mui/material";
import Section from "../../../../components/Section";
import DataGrid from "../../components/EditableDatagrid";
import { useOriginSettingsRows } from "../../../../hooks/utils";
import { Row, useCertificationsColumns } from "./columns";


const Tab = () => {
  const { rows, handleRowChange } = useOriginSettingsRows<Row>(
    "tenant",
    "certifications"
  );

  const columns = useCertificationsColumns();
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
        <DataGrid
          columns={columns}
          rows={rows}
          processRowUpdate={handleRowChange}
        />
      </Section>
    </Box>
  );
};

export default Tab;
