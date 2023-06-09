import { FunctionComponent } from "react";
import { Box, Button } from "@mui/material";
import plusIcon from "@/assets/images/plus-icon.svg";
import PageSectionContainer from "@/pages/settings/components/SectionContainer";
import OrganizationViewContainer from "./containers/organizationViewContainer";
import HeaderToolbar from "../../../../components/HeaderToolbar";

const Organization: FunctionComponent = () => {
  return (
    <PageSectionContainer>
      <HeaderToolbar
        rightComponent={
          <Button disableElevation={false} startIcon={<img src={plusIcon} />}>
            new organization
          </Button>
        }
      />

      <OrganizationViewContainer />
    </PageSectionContainer>
  );
};

export default Organization;
