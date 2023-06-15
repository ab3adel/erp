import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import PageSectionContainer from "@/pages/settings/components/SectionContainer";
import OrganizationViewContainer from "./containers/organizationViewContainer";
import HeaderToolbar from "../../../../components/HeaderToolbar";
import OrganizationCreateContainer from "./containers/OrganizationCreateContainer/OrganizationCreateContainer";

const Organization: FunctionComponent = () => {
  return (
    <PageSectionContainer>
      <HeaderToolbar rightComponent={<OrganizationCreateContainer />} />
      <Box mt={2}>
        <OrganizationViewContainer />
      </Box>
    </PageSectionContainer>
  );
};

export default Organization;
