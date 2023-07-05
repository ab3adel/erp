import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Section from "../../../../components/Section";
import DataGrid from "../../components/EditableDatagrid";
import { useOriginSettingsRows } from "../../../../hooks/utils";
import {
  useOriginSetting,
  useOriginSettingGetter,
  useOriginSettingSetter,
} from "../../../../hooks/states";
import { Row, useCoffeeTermsColumns } from "./columns";
import { ALocation, VolumeToWieghtUnit } from "../../../../types";
import { uniqueId } from "lodash";

const Tab = () => {
  const [locations, setTenantLocations] = useOriginSetting<string[]>(
    "tenant",
    "locations"
  );

  const [grades, setGrades] = useOriginSetting<string[]>("tenant", "grades");

  const setLocations = useOriginSettingSetter<Partial<ALocation>[]>(
    "locations",
    "main"
  );
  const setUnits = useOriginSettingSetter<Partial<VolumeToWieghtUnit>[]>(
    "uom",
    "LtoKg"
  );

  const defaultCoffeeStates = useOriginSettingGetter< string[]>(
    "default",
    "coffee_states"
  );

  const { rows, addRow, deleteRow, handleRowChange } =
    useOriginSettingsRows<Row>("coffee_terms", "main", {
      rowsChanged: (newRows) => {
        const flatten = (acc?: string[], curr?: string[]) =>
          acc?.concat(curr?.filter((item) => !acc?.includes(item)) ?? []);

        const allGrades = newRows.map((row) => row.grades).reduce(flatten, []);
        const allLocations = newRows
          .map((row) => row.locations)
          .reduce(flatten, []);

        setGrades(allGrades ?? []);
        setTenantLocations(allLocations ?? []);
        setUnits(
          newRows.map((row) => ({
            id: uniqueId(),
            coffee_state: row.coffee_state,
          }))
        );
        if (allLocations)
          setLocations(
            allLocations.map((location) => ({ id: uniqueId(), location }))
          );
      },
    });

  const columns = useCoffeeTermsColumns(
    defaultCoffeeStates,
    grades,
    locations,
    deleteRow
  );

  return (
    <Box>
      <Typography variant="h6" mb={3}>
        What terms would you prefer for each state of coffee?
      </Typography>
      <Section
        title="State of Coffee"
        headline="Customize terms pertinent to your operation"
        subheadline="Specify the relevant terms that should appear as dropdown options throughout the platform"
        example="e.g.  Our Words: Cherry; Your Words: Uva; Sub-Type/Grade: A1, A2 ; Location(s): Reception point, wet mill"
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
          onClick={
            () => addRow()
            // (id) => setTimeout(() => datagridRef?.current.startRowEditMode({ id }))
          }
        >
          New State Of Coffee
        </Button>
      </Section>
    </Box>
  );
};

export default Tab;
