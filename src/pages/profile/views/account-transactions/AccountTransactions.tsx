import { Box, Button, Typography } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import { useReceiptionsTableColumns } from "@/pages/managment/views/receptions/hooks";
import { DataGridPro } from "@mui/x-data-grid-pro";

const rows = [
  {
    id: "1",
    receptionDate: new Date(),
    status: "pending",
    accountId: "A1",
    accountName: "Account 1",
    lotNumber: 1001,
    grade: "A",
    weight: 50,
    totalCost: 1000,
    payment: true,
    commission: 10,
    uom: "kg",
    cherry_price: 2.5,
    currency_fixed: "USD",
  },
  {
    id: "2",
    receptionDate: new Date(),
    status: "approved",
    accountId: "A2",
    accountName: "Account 2",
    lotNumber: 1002,
    grade: "B",
    weight: 40,
    totalCost: 800,
    payment: false,
    commission: 8,
    uom: "kg",
    cherry_price: 2.2,
    currency_fixed: "USD",
  },
  {
    id: "3",
    receptionDate: new Date(),
    status: "pending",
    accountId: "A3",
    accountName: "Account 3",
    lotNumber: 1003,
    grade: "A+",
    weight: 55,
    totalCost: 1100,
    payment: true,
    commission: 11,
    uom: "kg",
    cherry_price: 2.8,
    currency_fixed: "USD",
  },
  {
    id: "20",
    receptionDate: new Date(),
    status: "approved",
    accountId: "A20",
    accountName: "Account 20",
    lotNumber: 1020,
    grade: "C",
    weight: 30,
    totalCost: 600,
    payment: false,
    commission: 6,
    uom: "kg",
    cherry_price: 2.0,
    currency_fixed: "USD",
  },
];

export const AccountTransactions = () => {
  const columns = useReceiptionsTableColumns();

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" flexDirection="column" rowGap={1} ml={4}>
          <VolunteerActivismOutlinedIcon
            fontSize="large"
            sx={{ color: "primary.main" }}
          />
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Total Harvest
          </Typography>
          <Typography variant="h5">1000 KG</Typography>
        </Box>
        <Button startIcon={<RemoveRedEyeOutlinedIcon />}>
          View in receiption
        </Button>
      </Box>
      <div style={{ width: "100%", marginTop: 16 }}>
        <div style={{ height: 450, width: "100%" }}>
          <DataGridPro
            unstable_headerFilters
            rows={rows}
            columns={columns}
            checkboxSelection
            paginationMode="client"
          />
        </div>
      </div>
    </Box>
  );
};
