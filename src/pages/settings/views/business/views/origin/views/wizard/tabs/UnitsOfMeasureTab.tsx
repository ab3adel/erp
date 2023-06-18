import { useCallback, useMemo, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGridProProps, GridColDef, GridRowId } from "@mui/x-data-grid-pro";
import { Add } from "@mui/icons-material";
import Section from "../../../components/Section";
import DataGrid, {
  cellDeleteAction,
  cellTextField,
} from "../components/EditableDatagrid";

// TODO: Split sections into three separate components

const rows = [
  {
    id: "1",
    quantity: 1,
  },
];
type Row = (typeof rows)[number];

const useWeightColumns = (onDelete: (id: GridRowId) => void) =>
  useMemo<GridColDef<Row>[]>(
    () => [
      {
        headerName: "Quantity",
        field: "quantity",
        width: 88,
        sortable: false,
      },
      {
        headerName: "Your Unit of Measure",
        field: "uom",
        flex: 1,
        sortable: false,
        renderCell: (params) => cellTextField(params, "Unit of Measure"),
      },
      {
        headerName: "Equivalent in Kilograms (Kg)",
        field: "eq",
        flex: 1,
        sortable: false,
        renderCell: (params) => cellTextField(params, "Value in Kg"),
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

const useVolumeColumns = (onDelete: (id: GridRowId) => void) =>
  useMemo<GridColDef<Row>[]>(
    () => [
      {
        headerName: "Quantity",
        field: "quantity",
        width: 88,
        sortable: false,
      },
      {
        headerName: "Your Unit of Measure",
        field: "uom",
        flex: 1,
        sortable: false,
        renderCell: (params) => cellTextField(params, "Unit of Measure"),
      },
      {
        headerName: "Equivalent in Litres (L)",
        field: "eq",
        flex: 1,
        sortable: false,
        renderCell: (params) => cellTextField(params, "Value in L"),
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

const useAreaColumns = (onDelete: (id: GridRowId) => void) =>
  useMemo<GridColDef<Row>[]>(
    () => [
      {
        headerName: "Quantity",
        field: "quantity",
        width: 88,
        sortable: false,
      },
      {
        headerName: "Your Unit of Measure",
        field: "uom",
        flex: 1,
        sortable: false,
        renderCell: (params) => cellTextField(params, "Unit of Measure"),
      },
      {
        headerName: "Equivalent in Hectare (Ha)",
        field: "eq",
        flex: 1,
        sortable: false,
        renderCell: (params) => cellTextField(params, "Value in Ha"),
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

const volToWeColumns: DataGridProProps["columns"] = [
  {
    headerName: "Quantity",
    field: "quantity",
    width: 88,
    sortable: false,
  },
  {
    headerName: "Your Unit of Measure",
    field: "uom",
    flex: 1,
    sortable: false,
    renderCell: (params) => cellTextField(params, "Unit of Measure"),
  },
  {
    headerName: "State of Coffee",
    field: "soc",
    flex: 1,
    sortable: false,
  },
  {
    headerName: "Equivalent in (L)",
    field: "eqL",
    flex: 1,
    sortable: false,
    renderCell: (params) => cellTextField(params, "Value in Litres"),
  },
  {
    headerName: "Equivalent in (Kg)",
    field: "eqKg",
    flex: 1,
    sortable: false,
    renderCell: (params) => cellTextField(params, "Value in Kilograms"),
  },
];

const volRows = [
  {
    id: "1",
    quantity: 1,
    uom: "Bucket",
    soc: "User Words (Cherry)",
    eqL: 4,
    eqKg: 2,
  },
  {
    id: "2",
    quantity: 1,
    soc: "User Words (Wet P)",
  },
  {
    id: "3",
    quantity: 1,
    soc: "User Words (Dry P)",
  },
  {
    id: "4",
    quantity: 1,
    soc: "User Words (Green)",
  },
];

const Tab = () => {
  // Weight Data Grid Stuff
  const [weightRows, setWeightRows] = useState(rows);
  const deleteWeightRow = useCallback(
    (id: GridRowId) =>
      setWeightRows((prev) => prev.filter((row) => row.id !== id)),
    []
  );
  const weightColumns = useWeightColumns(deleteWeightRow);

  // Volume Data Grid Stuff
  const [volumeRows, setVolumeRows] = useState(rows);
  const deleteVolumeRow = useCallback(
    (id: GridRowId) =>
      setVolumeRows((prev) => prev.filter((row) => row.id !== id)),
    []
  );
  const volumeColumns = useVolumeColumns(deleteVolumeRow);

  // Area Data Grid Stuff
  const [areaRows, setAreaRows] = useState(rows);
  const deleteAreaRow = useCallback(
    (id: GridRowId) =>
      setAreaRows((prev) => prev.filter((row) => row.id !== id)),
    []
  );
  const areaColumns = useAreaColumns(deleteAreaRow);

  return (
    <Box>
      <Typography variant="h6" mb={3}>
        What are your preferred units of measure for this origin?
      </Typography>
      <Section
        title="Weight"
        headline="Convert to Kilograms (Kg)"
        subheadline="Please list the units of measure you use throughout your operation, and convert to Kg."
        example="e.g. 1 -> Bag = 60 Kilograms (Kg)"
      >
        <DataGrid columns={weightColumns} rows={weightRows} />
        <Button
          variant="text"
          startIcon={<Add />}
          sx={{ mt: 1 }}
          onClick={() =>
            setWeightRows((prev) => [
              ...prev,
              { id: Date.now().toString(), quantity: 1 },
            ])
          }
        >
          New Unit of Measure
        </Button>
      </Section>
      <Section
        title="Volume"
        headline="Convert to Liter (L)"
        subheadline="Please list the units of measure you use throughout your operation, and convert to Litres."
        example="e.g. 1 -> Bag = 132.277 Litres (L)"
      >
        <DataGrid columns={volumeColumns} rows={volumeRows} />
        <Button
          variant="text"
          startIcon={<Add />}
          sx={{ mt: 1 }}
          onClick={() =>
            setVolumeRows((prev) => [
              ...prev,
              { id: Date.now().toString(), quantity: 1 },
            ])
          }
        >
          New Unit of Measure
        </Button>
      </Section>
      <Section
        title="Convert Volume to Weight"
        headline="Convert Litres to Kg"
        subheadline="Please add a conversion value for each state of cherry"
        example="e.g.  1 -> Bucket -> Cherry -> = 4 L ->  = 2 Kg"
      >
        <DataGrid columns={volToWeColumns} rows={volRows} />
      </Section>
      <Section
        title="Area"
        headline="Convert to Hectare (Ha)"
        subheadline="Please list the units of measure you use throughout your operation, and convert to Ha"
        example="e.g.  1 -> Acre = 0.405 Ha"
      >
        <DataGrid columns={areaColumns} rows={areaRows} />
        <Button
          variant="text"
          startIcon={<Add />}
          sx={{ mt: 1 }}
          onClick={() =>
            setAreaRows((prev) => [
              ...prev,
              { id: Date.now().toString(), quantity: 1 },
            ])
          }
        >
          New Unit of Measure
        </Button>
      </Section>
    </Box>
  );
};

export default Tab;
