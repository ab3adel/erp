import { Box, Button, Grid, Paper } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { CurvedTabs } from "@/shared/components/curvedTabs/CurvedTabs";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { UserProfileInfo } from "@/pages/profile/components/UserProfileInfo";

export const FarmerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Box>
      <Box my={2}>
        <Button
          startIcon={<ArrowBackOutlinedIcon />}
          variant="text"
          color="primary"
          onClick={() => {
            navigate("/relationships/accounts");
          }}
        >
          Accounts
        </Button>
      </Box>
      <Grid container spacing={3} mb={1} justifyContent="space-between">
        <Grid item xs={12} md={3}>
          <UserProfileInfo />
        </Grid>
        <Grid item xs={12} md={9}>
          <CurvedTabs
            tabs={[
              {
                label: "FARMS",
                value: `/${id}/farmer-profile`,
              },
              {
                label: "COSTS",
                value: `/${id}/farmer-profile/costs`,
              },
              {
                label: "TRANSACTIONS",
                value: `/${id}/farmer-profile/transactions`,
              },
              {
                label: "NOTES",
                value: `/${id}/farmer-profile/notes`,
              },
            ]}
            localStorageKey="farmer-profile"
            canDelete={false}
            canDrag={false}
          />
          <Paper elevation={0} sx={{ borderRadius: "0px 0px 12px 12px" }}>
            <Outlet />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
