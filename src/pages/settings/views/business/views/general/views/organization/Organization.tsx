import { FunctionComponent } from "react";
import { Box, Button } from "@mui/material";
import plusIcon from "@/assets/images/plus-icon.svg";
import PageSectionContainer from "@/pages/settings/components/SectionContainer";
import OrganizationViewContainer from "./containers/organizationViewContainer";

const Organization: FunctionComponent = () => {
  return (
    <PageSectionContainer>
      <Box mb={3} display="flex" justifyContent="flex-end">
        <Button disableElevation={false} startIcon={<img src={plusIcon} />}>
          new organization
        </Button>
      </Box>

      <OrganizationViewContainer />
    </PageSectionContainer>
  );
};

export default Organization;
