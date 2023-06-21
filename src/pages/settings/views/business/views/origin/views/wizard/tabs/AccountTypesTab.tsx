import { useCallback, useMemo, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { GridColDef, GridRowId } from "@mui/x-data-grid-pro";
import Section from "../../../components/Section";
import DataGrid, {
  cellDeleteAction,
  cellSelect,
  CellTextField,
} from "../components/EditableDatagrid";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";

const rows = [
  { id: "1", ours: "Farmer" },
  { id: "2", ours: "Agent" },
  { id: "3", ours: "Processing Facility" },
  { id: "4", ours: "Buyer" },
  { id: "5", ours: "Plot" },
  { id: "6" },
];

type Row = (typeof rows)[number];

const useAccountTypesColumns = (onDelete: (id: GridRowId) => void) =>
  useMemo<GridColDef<Row>[]>(
    () => [
      {
        headerName: "Our Words",
        field: "ours",
        flex: 1,
        sortable: false,
        renderCell: (params) =>
          cellSelect(params, "Account Type", {
            options: [
              "Farmer",
              "Agent",
              "Processing Facility",
              "Buyer",
              "Plot",
            ],
          }),
      },
      {
        headerName: "Your Words",
        field: "yours",
        flex: 1,
        sortable: false,
        renderCell: (params) => (
          <CellTextField params={params} label="Enter Your Words" />
        ),
      },
      {
        field: "actions",
        type: "actions",
        flex: 1,
        maxWidth: 100,
        sortable: false,
        getActions: (params) => cellDeleteAction(params, onDelete),
      },
    ],
    [onDelete]
  );

const Tab = ({
  datagridRef,
}: {
  datagridRef?: React.MutableRefObject<GridApiPro> | undefined;
}) => {
  const [currentRows, setCurrentRows] = useState(rows);
  const deleteRow = useCallback(
    (id: GridRowId) =>
      setCurrentRows((prev) => prev.filter((row) => row.id !== id)),
    []
  );
  const columns = useAccountTypesColumns(deleteRow);
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
        <DataGrid columns={columns} rows={currentRows} />
        <Button
          variant="text"
          startIcon={<Add />}
          sx={{ mt: 1 }}
          onClick={() =>
            setCurrentRows((prev) => [...prev, { id: Date.now().toString() }])
          }
        >
          New Account Type
        </Button>
      </Section>
    </Box>
  );
};

export default Tab;
