import PageSectionContainer from "@/pages/settings/components/SectionContainer";
import { FunctionComponent } from "react";
import HeaderToolbar from "../../../../components/HeaderToolbar";
import { Button, Divider, Typography } from "@mui/material";
import StarOutline from "@mui/icons-material/StarOutline";
import BusinessIcon from "@mui/icons-material/Business";
import { Box } from "@mui/material";
import TeamsRoleTable from "./components/TeamsRoleTable";
import RemoveMemberDialog from "./components/RemoveMemberDialog";
import AddOwnerDialog from "./components/AddOwnerDialog";
import DeactivateMemberDialog from "./components/DeactivateMemberDialog";
import AddTeamMemberButtonContainer from "../../containers/AddTeamMemberButtonContainer";
import { useTeams } from "./hooks/useTeams";

const Teams: FunctionComponent = () => {
  const { data: data } = useTeams({ first: 1000, page: 1 });

  return (
    <PageSectionContainer>
      <RemoveMemberDialog open={false} />
      <AddOwnerDialog open={false} />
      <DeactivateMemberDialog open={false} />

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
        rightComponent={
          <Button startIcon={<StarOutline />} disableElevation={false}>
            Add Owner
          </Button>
        }
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

      {/* [
          {
            id: 1,
            entity: { email: "jane@longmilescoffee.com", name: "Jane Doe" },
            modules: ["module_c"],
            permissions: ["owner"],
          },
        ] */}
      {}
      <TeamsRoleTable
        data={data?.users.data.map((item) => ({
          id: item.id,
          permissions: item.abilities.map((ability) => ability.title),
          modules: ["unknown"],
          entity: { email: item.email, name: item.name },
          role: item.role,
        }))}
      />
      <Box mt={2}>
        <AddTeamMemberButtonContainer />
      </Box>
    </PageSectionContainer>
  );
};

export default Teams;
