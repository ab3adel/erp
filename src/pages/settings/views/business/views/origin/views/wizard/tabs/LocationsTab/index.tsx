import { Box, Typography } from "@mui/material";
import Section from "../../../../components/Section";
import { useOriginSettingsRows } from "../../../../hooks/utils";
import {
  useOriginSetting,
  useOriginSettingGetter,
  useOriginSettingSetter,
} from "../../../../hooks/states";
import DataGrid from "../../components/EditableDatagrid";
import { Row, useLocationsColumns } from "./columns";
import { WithId, YieldEstimation } from "../../../../types";
import { uniqueId } from "lodash";

const Tab = () => {
  const accountCategories = useOriginSettingGetter<string[]>(
    "default",
    "account_categories"
  );

  const setYieldEstimations = useOriginSettingSetter<
    WithId<Partial<YieldEstimation>>[]
  >("yield_estimations", "main");

  const [processMethods, setProcessMethods] = useOriginSetting<string[]>(
    "tenant",
    "process_methods"
  );

  const { rows, deleteRow, handleRowChange } = useOriginSettingsRows<Row>(
    "locations",
    "main",
    {
      rowsChanged: (newRows) => {
        const flatten = (acc?: string[], curr?: string[]) =>
          acc?.concat(curr?.filter((item) => !acc?.includes(item)) ?? []);

        const allProcessMethods = newRows
          .map((row) => row.process_methods)
          .reduce(flatten, []);

        setProcessMethods(allProcessMethods ?? []);
        if (allProcessMethods)
          setYieldEstimations(
            allProcessMethods.map((pm) => ({
              id: uniqueId(),
              process_method: pm,
            }))
          );
      },
    }
  );

  const columns = useLocationsColumns(
    accountCategories,
    processMethods,
    deleteRow
  );
  return (
    <Box>
      <Typography variant="h6" mb={3}>
        Which actions are performed in each location?
      </Typography>
      <Section
        title="Actions by Location"
        headline="Locations details"
        subheadline="Specify account type, sub-locations and processing methods for each location."
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
