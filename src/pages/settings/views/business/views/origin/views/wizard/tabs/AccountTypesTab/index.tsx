import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Section from "../../../../components/Section";
import { useOriginSettingsRows } from "../../../../hooks/utils";
import { useOriginSettingGetter } from "../../../../hooks/states";
import DataGrid from "../../components/EditableDatagrid";
import { useAccountTypesColumns } from "./columns";

const Tab = () => {
  const accountCategories = useOriginSettingGetter<string, string[]>(
    "default",
    "account_categories",
    (payload) => JSON.parse(payload ?? "[]")
  );

  const { rows, addRow, deleteRow, handleRowChange } = useOriginSettingsRows(
    "account_types",
    "main"
  );

  const columns = useAccountTypesColumns(accountCategories, deleteRow);

  return (
    <Box>
      <Typography variant="h6" mb={3}>
        What terms would you prefer for each account type?
      </Typography>
      <Section
        title="Account Types"
        headline="Customize account type terms"
        subheadline="These account types will appear as options in your account management section of the portal. There can be more than one account type assigned each category:"
        example={[
          "e.g. Buyer -> “Exporter”",
          // emsp : full width space
          // ensp : half widht space
          // nbsp : Blank box with half-width continuous rows
          <>&emsp;&ensp;&nbsp;{"Buyer -> “Importer”"}</>,
          <>&emsp;&ensp;&nbsp;{"Buyer ->  “Roaster”"}</>,
        ]}
      >
        <DataGrid
          columns={columns}
          rows={rows}
          processRowUpdate={handleRowChange}
        />
        <Button
          variant="text"
          startIcon={<AddIcon />}
          sx={{ mt: 1 }}
          onClick={() => addRow()}
        >
          New Account Type
        </Button>
      </Section>
    </Box>
  );
};

export default Tab;
