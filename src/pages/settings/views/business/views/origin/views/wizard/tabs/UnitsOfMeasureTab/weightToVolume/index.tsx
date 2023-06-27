import Section from "../../../../../components/Section";
import { useOriginSettingsRows } from "../../../../../hooks/utils";
import DataGrid from "../../../components/EditableDatagrid";
import { Row, useVolToWeColumns } from "./columns";

const Tab = () => {
  const { rows, handleRowChange } = useOriginSettingsRows<Row>("uom", "LtoKg");

  const columns = useVolToWeColumns();

  return (
    <Section
      title="Convert Volume to Weight"
      headline="Convert Litres to Kg"
      subheadline="Please add a conversion value for each state of cherry"
      example="e.g.  1 -> Bucket -> Cherry -> = 4 L ->  = 2 Kg"
    >
      <DataGrid
        columns={columns}
        rows={rows}
        processRowUpdate={handleRowChange}
      />
    </Section>
  );
};

export default Tab;
