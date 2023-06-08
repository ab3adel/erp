import PageSectionContainer from "@/pages/settings/components/SectionContainer";
import Header from "./components/Header";
import { Box } from "@mui/material";
import EditForm from "./components/EditForm";
import NavigationContainer from "./containers/NavigationContainer";

const Edit = () => {
  return (
    <PageSectionContainer>
      <NavigationContainer />

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
