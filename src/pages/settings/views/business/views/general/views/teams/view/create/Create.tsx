import PageSectionContainer from "@/pages/settings/components/SectionContainer";
import { FunctionComponent } from "react";
import Stepper from "./components/Stepper";
import EmailInsertion from "./components/main/EmailInsertion";
import ActionBar from "./components/ActionBar";
import { Box } from "@mui/material";
import Permissions from "./components/main/permissions/Permissions";
import Overview from "./components/main/overview/Overview";
import Acknowledge from "./components/main/Acknowledge";

const Create: FunctionComponent = () => {
  return (
    <Box>
      <Box px={18} py={4}>
        <PageSectionContainer disableGutter>
          <Box mx={3}>
            <Stepper />
          </Box>
          {/* <EmailInsertion />
          <Permissions /> */}
          {/* <Overview /> */}
          <Acknowledge />
        </PageSectionContainer>
      </Box>
      <ActionBar />
    </Box>
  );
};

export default Create;
