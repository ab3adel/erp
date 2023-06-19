import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid-pro";
import Section from "../../../components/Section";
import DataGrid, { cellTextField } from "../components/EditableDatagrid";

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
    renderCell: (params) => cellTextField(params, "Enter Your Term"),
  },
];

const rows = [
  {
    id: "1",
    ours: {
      name: "Lot Name",
      desc: "Number used to identify a batch of coffee",
    },
  },
  {
    id: "2",
    ours: {
      name: "Supplier Account",
      desc: "The entity that grows and supplies coffee",
    },
  },
  {
    id: "3",
    ours: { name: "Address 1", desc: "The top level of an address" },
  },
  {
    id: "4",
    ours: { name: "Address 2", desc: "“Address 1” is part of Address 2" },
  },
  {
    id: "5",
    ours: { name: "City", desc: "The “city” that “Address 2” is located in" },
  },
  {
    id: "6",
    ours: { name: "Zone", desc: "The “zone” that the “city” is located in" },
  },
  {
    id: "7",
    ours: {
      name: "District",
      desc: "The “district” that the “city” is located in",
    },
  },
  {
    id: "8",
    ours: {
      name: "Government ID",
      desc: "Personal ID number or code used by government",
    },
  },
  {
    id: "9",
    ours: {
      name: "Coffee State",
      desc: "The state of the coffee (ex: “Cherry”, “Parchment”)",
    },
  },
  {
    id: "10",
    ours: { name: "Grade", desc: "A type or quality indicator of the coffee" },
  },
  {
    id: "11",
    ours: { name: "Source", desc: "The source of the coffee in the operation" },
  },
  {
    id: "12",
    ours: { name: "Reception", desc: "The location the cherry is received to" },
  },
  {
    id: "13",
    ours: { name: "Inventory", desc: "The lots that have been approved" },
  },
  {
    id: "14",
    ours: {
      name: "External Receipt Number",
      desc: "Number for the transaction, when coffee is purchased",
    },
  },
  {
    id: "15",
    ours: {
      name: "Allocated",
      desc: "Coffee that has been earmarked for a specific buyer",
    },
  },
  {
    id: "16",
    ours: {
      name: "Commission",
      desc: "Additional cost per unit of coffee cherry",
    },
  },
];

const Tab = () => {
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
        <DataGrid columns={columns} rows={rows} />
      </Section>
    </Box>
  );
};

export default Tab;
