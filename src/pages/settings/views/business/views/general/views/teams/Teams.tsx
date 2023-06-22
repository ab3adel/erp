import PageSectionContainer from "@/pages/settings/components/SectionContainer";
import { FunctionComponent } from "react";
import HeaderToolbar from "../../../../components/HeaderToolbar";
import { Divider, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import { Box } from "@mui/material";
import AddTeamMemberButtonContainer from "../../containers/AddTeamMemberButtonContainer";
import AddOwner from "./containers/addOwner/addOwner";
import RemoveMember from "./containers/removeMember/removeMember";
import DeactivateMember from "./containers/deactivateMember/deactivateMember";
import ActivateMember from "./containers/activateMember/activateMember";
import TeamsContainer from "./containers/teams/teams";
import AddOwnerTrigger from "./containers/addOwnerTrigger/addOwnerTrigger";

const Teams: FunctionComponent = () => {
  return (
    <PageSectionContainer>
      <AddOwner />
      <RemoveMember />
      <DeactivateMember />
      <ActivateMember />

      <HeaderToolbar
        leftComponent={
          <Typography
            variant="h6"
            fontWeight={500}
            fontSize={20}
            color="rgba(36, 40, 40, 0.87)"
          >
            Team Roles
          </Typography>
        }
        rightComponent={<AddOwnerTrigger />}
      />

      <HeaderToolbar
        leftComponent={
          <Box display="flex" gap={1}>
            <BusinessIcon />

            <Typography variant="body1" fontWeight={400}>
              Long Miles Burundi
            </Typography>
          </Box>
        }
      />
      <Box mt={2} mb={3}>
        <Divider />
      </Box>

      <TeamsContainer />

      <Box mt={2}>
        <AddTeamMemberButtonContainer />
      </Box>
    </PageSectionContainer>
  );
};

export default Teams;
