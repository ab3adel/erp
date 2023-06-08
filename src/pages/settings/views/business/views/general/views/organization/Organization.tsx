import { FunctionComponent } from "react";
import { Box, Button } from "@mui/material";
import plusIcon from "@/assets/images/plus-icon.svg";
import { IOrganization } from "@/shared/models/models";
import OrganizationCard from "./components/OrganizationCard";
import PageSectionContainer from "@/pages/settings/components/SectionContainer";

const Organization: FunctionComponent = () => {
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

  return (
    <PageSectionContainer>
      <Box mb={3} display="flex" justifyContent="flex-end">
        <Button disableElevation={false} startIcon={<img src={plusIcon} />}>
          new organization
        </Button>
      </Box>

      <OrganizationCard name="Long Miles Burundi" data={data} />
    </PageSectionContainer>
  );
};

export default Organization;
