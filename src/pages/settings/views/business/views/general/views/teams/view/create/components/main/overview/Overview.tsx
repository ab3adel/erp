import { Box, Divider, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PermissionOverview from "../../../../../components/PermissionOverview";
import { modulesImages } from "@/shared/enums/modules-images";
import { Actions } from "@/shared/enums/actions";

interface OverviewProps {}

const Overview: FunctionComponent<OverviewProps> = () => {
  return (
    <>
      <Box mt={8}>
        <Box textAlign="center">
          <Box my={1}>
            <MailOutlineRoundedIcon sx={{ fontSize: 40 }} color="action" />
          </Box>
          <Box my={1}>
            <Typography variant="h6" fontWeight={500}>
              Invite{" "}
              <span style={{ fontWeight: 700 }}>bianca@longmiles.com</span> to{" "}
              <span style={{ fontWeight: 700 }}>Long Miles Burundi</span>
            </Typography>
          </Box>
          <Box my={1}>
            <Typography
              variant="body1"
              fontWeight={400}
              color="text.secondary"
              fontSize={16}
            >
              Send your teammate a warm welcome and everything they need for a
              smooth start in the M·Cultivo app.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box my={4}>
        <Divider />
      </Box>

      <Box textAlign="center">
        <Typography
          variant="h6"
          fontSize={20}
          fontWeight={500}
          color="#242828DE"
        >
          Review Permissions
        </Typography>

        <Box display="flex" justifyContent="center">
          <Box mt={4} maxWidth={560} width="100%">
            <PermissionOverview
              icon={modulesImages.CoffeeManagment}
              label="Coffee Management"
              permissionList={[
                {
                  label: "Management",
                  actions: [Actions.read, Actions.write, Actions.delete],
                },
                {
                  label: "Management Actions",
                  actions: [Actions.read, Actions.write, Actions.delete],
                },
              ]}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Overview;
