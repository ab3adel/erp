import NavigateBackContainer from "@/pages/settings/components/NavigateBackContainer";
import PageSectionContainer from "@/pages/settings/components/SectionContainer";
import Header from "./components/Header";
import { Box } from "@mui/material";
import EditForm from "./components/EditForm";

const Edit = () => {
  return (
    <PageSectionContainer>
      <NavigateBackContainer backLabel="Organization" />

      <Box mt={2}>
        <Header />
      </Box>

      <Box maxWidth={440} mt={3}>
        <EditForm />
      </Box>
    </PageSectionContainer>
  );
};

export default Edit;
