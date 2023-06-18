import { Box, Typography } from "@mui/material";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";

const columns: GridColDef[] = [
  {
    headerName: "Our Words",
    field: "ours",
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <Box>
        <Typography variant="body2" color="text.primary">
          {params.value.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {params.value.desc}
        </Typography>
      </Box>
    ),
  },
  {
    headerName: "Your Words",
    field: "yours",
    flex: 1,
    sortable: false,
  },
];

const rows = [
  {
    id: "1",
    ours: {
      name: "Lot Name",
      desc: "Number used to identify a batch of coffee",
    },
    yours: "Nickname",
  },
  {
    id: "2",
    ours: {
      name: "Supplier Account",
      desc: "The entity that grows and supplies coffee",
    },
    yours: "Farmer Account",
  },
  {
    id: "3",
    ours: { name: "Address 1", desc: "The top level of an address" },
    yours: "Address 1",
  },
  {
    id: "4",
    ours: { name: "Address 2", desc: "“Address 1” is part of Address 2" },
    yours: "Address 2",
  },
  {
    id: "5",
    ours: { name: "City", desc: "The “city” that “Address 2” is located in" },
    yours: "City",
  },
  {
    id: "6",
    ours: { name: "Zone", desc: "The “zone” that the “city” is located in" },
    yours: "Zone",
  },
  {
    id: "7",
    ours: {
      name: "District",
      desc: "The “district” that the “city” is located in",
    },
    yours: "District",
  },
  {
    id: "8",
    ours: {
      name: "Government ID",
      desc: "Personal ID number or code used by government",
    },
    yours: "Cedula",
  },
  {
    id: "9",
    ours: {
      name: "Coffee State",
      desc: "The state of the coffee (ex: “Cherry”, “Parchment”)",
    },
    yours: "Product Type",
  },
  {
    id: "10",
    ours: { name: "Grade", desc: "A type or quality indicator of the coffee" },
    yours: "Grade",
  },
  {
    id: "11",
    ours: { name: "Source", desc: "The source of the coffee in the operation" },
    yours: "Coffee Supplier",
  },
  {
    id: "12",
    ours: { name: "Reception", desc: "The location the cherry is received to" },
    yours: "Punto de Acopio",
  },
  {
    id: "13",
    ours: { name: "Inventory", desc: "The lots that have been approved" },
    yours: "Inventory",
  },
  {
    id: "14",
    ours: {
      name: "External Receipt Number",
      desc: "Number for the transaction, when coffee is purchased",
    },
    yours: "Recibo",
  },
  {
    id: "15",
    ours: {
      name: "Allocated",
      desc: "Coffee that has been earmarked for a specific buyer",
    },
    yours: "Reservado",
  },
  {
    id: "16",
    ours: {
      name: "Commission",
      desc: "Additional cost per unit of coffee cherry",
    },
    yours: "Commission",
  },
];

const KeywordConfigurationTable = () => (
  <DataGridPro
    sx={{
      overflowX: "scroll",
      "& .MuiDataGrid-row:last-child > *": {
        border: "none",
      },
    }}
    rowHeight={80}
    columns={columns}
    disableRowSelectionOnClick
    hideFooter
    rows={rows}
  />
);
export default KeywordConfigurationTable;
