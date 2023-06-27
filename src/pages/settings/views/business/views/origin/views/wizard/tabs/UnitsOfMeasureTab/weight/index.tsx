import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Section from "../../../../../components/Section";
import { useOriginSettingsRows } from "../../../../../hooks/utils";
import DataGrid from "../../../components/EditableDatagrid";
import { useWeightColumns } from "./columns";

const Tab = () => {
  const { rows, addRow, deleteRow, handleRowChange } = useOriginSettingsRows(
    "uom",
    "toKg"
  );

  const columns = useWeightColumns(deleteRow);

  return (
    <Section
      title="Weight"
      headline="Convert to Kilograms (Kg)"
      subheadline="Please list the units of measure you use throughout your operation, and convert to Kg."
      example="e.g. 1 -> Bag = 60 Kilograms (Kg)"
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
          addRow()
          // (id) => setTimeout(() => datagridRef?.current.startRowEditMode({ id }))
        }
      >
        New Unit of Measure
      </Button>
    </Section>
  );
};

export default Tab;
