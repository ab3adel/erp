import { FunctionComponent } from "react";
import OrganizationCard from "../components/OrganizationCard";
import { IOrganization } from "@/shared/models/models";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import AddTeamMemberButtonContainer from "../../../containers/AddTeamMemberButtonContainer";
import { useOrganiaztion } from "@/shared/hooks/graphql/queries/useOrganization/useOrganization";
import { useSelectedOrganiztion } from "@/global/states/selectedOrganizations";

const OrganizationViewContainer: FunctionComponent = () => {
  const data: IOrganization[] = [
    {
      id: 1,
      city: "New York",
      currency: "USD",
      language: "English",
      team_members: 10,
      plan: "Pro",
    },
  ];

  const selectedOrganizationId = useSelectedOrganiztion((root) => root.id);

  const { data: organizationData } = useOrganiaztion({
    id: selectedOrganizationId,
  });

  const navigate = useNavigate();

  const handleNavigateEdit = () =>
    navigate("/settings/business/general/organization/edit");

  return (
    <>
      {organizationData && (
        <OrganizationCard
          data={[
            {
              city: organizationData?.organization.city.name,
              currency: organizationData?.organization.currency.name,
              id: organizationData?.organization.id,
              language: organizationData?.organization.language.name,
              plan: organizationData?.organization.plan.name,
              team_members: organizationData?.organization.team_members,
            },
          ]}
          name={organizationData.organization.company_name}
          onEditClick={handleNavigateEdit}
          footer={
            <Box mt={2}>
              <AddTeamMemberButtonContainer />
            </Box>
          }
        />
      )}
    </>
  );
};

export default OrganizationViewContainer;
