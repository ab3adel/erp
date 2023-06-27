import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Section from "../../../../../components/Section";
import { useOriginSettingsRows } from "../../../../../hooks/utils";
import DataGrid from "../../../components/EditableDatagrid";
import { useAreaColumns } from "./columns";

const Tab = () => {
  const { rows, addRow, deleteRow, handleRowChange } = useOriginSettingsRows(
    "uom",
    "toHa"
  );

  const columns = useAreaColumns(deleteRow);

  return (
    <Section
      title="Area"
      headline="Convert to Hectare (Ha)"
      subheadline="Please list the units of measure you use throughout your operation, and convert to Ha"
      example="e.g.  1 -> Acre = 0.405 Ha"
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
        onClick={() =>
          addRow(
            // (id) => setTimeout(() => datagridRef?.current.startRowEditMode({ id }))
          )
        }
      >
        New Unit of Measure
      </Button>
    </Section>
  );
};

export default Tab;
