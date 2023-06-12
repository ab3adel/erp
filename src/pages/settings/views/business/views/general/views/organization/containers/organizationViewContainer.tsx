import { FunctionComponent } from "react";
import OrganizationCard from "../components/OrganizationCard";
import { IOrganization } from "@/shared/models/models";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import AddTeamMemberButtonContainer from "../../../containers/AddTeamMemberButtonContainer";

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

  const navigate = useNavigate();

  const handleNavigateEdit = () =>
    navigate("/settings/business/general/organization/edit");

  return (
    <>
      <OrganizationCard
        data={data}
        name="Long Miles Burundi"
        onEditClick={handleNavigateEdit}
        footer={
          <Box mt={2}>
            <AddTeamMemberButtonContainer />
          </Box>
        }
      />
    </>
  );
};

export default OrganizationViewContainer;
