import { Box, Typography } from "@mui/material";
import Section from "../../../../components/Section";
import { useOriginSettingsRows } from "../../../../hooks/utils";
import DataGrid from "../../components/EditableDatagrid";
import { useKeywordConfigurationColumns } from "./columns";

const Tab = () => {
  const { rows, handleRowChange } = useOriginSettingsRows(
    "tenant",
    "terminology"
  );

  const columns = useKeywordConfigurationColumns();

  return (
    <Box>
      <Typography variant="h6" mb={3}>
        What are your organization-specific terms?
      </Typography>
      <Section
        title="Terminology"
        headline="Customize Our Terminology (Optional)"
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
