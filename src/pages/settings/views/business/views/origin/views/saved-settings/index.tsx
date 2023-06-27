import { EditOutlined, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import {
  AccountTypesTable,
  AreaTable,
  CertificationsTable,
  CoffeeTermsTable,
  HarvestSeasonsTable,
  KeywordConfigurationTable,
  LocationsTable,
  VolumeTable,
  VolumeToWeightTable,
  WeightTable,
  YieldEstimationsTable,
} from "./grids";
import Section from "../../components/Section";
import { useNavigate } from "react-router-dom";

type CustomAccordionProps = {
  title: string;
  children: React.ReactNode;
};

const CustomAccordion = ({ title, children }: CustomAccordionProps) => (
  <Accordion
    defaultExpanded
    elevation={0}
    sx={{
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#0000001F",
    }}
  >
    <AccordionSummary expandIcon={<ExpandMore />}>
      <Typography variant="body1">{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
);
const SavedSettings = () => {
  const navigate = useNavigate();

  return (
    <Box minHeight={597} p={3} pt={4}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          startIcon={<EditOutlined />}
          sx={{ mb: 2 }}
          onClick={() => navigate("../wizard")}
        >
          Customize Settings
        </Button>
      </Box>

      {/* Coffee Terms */}
      <CustomAccordion title="Coffee Terms">
        <CoffeeTermsTable />
      </CustomAccordion>

      {/* Units of Measure */}
      <CustomAccordion title="Units of Measure">
        <Section
          title="Weight"
          headline="Convert to Kilograms (Kg)"
          subheadline="Please list the units of measure you use throughout your operation, and convert to Kg."
        >
          <WeightTable />
        </Section>
        <Section
          title="Volume"
          headline="Convert to Liter (L)"
          subheadline="Please list the units of measure you use throughout your operation, and convert to Litres."
        >
          <VolumeTable />
        </Section>
        <Section
          title="Convert Volume to Weight"
          headline="Convert Litres to Kg"
          subheadline="Please add a conversion value for each state of cherry"
        >
          <VolumeToWeightTable />
        </Section>
        <Section
          title="Area"
          headline="Convert to Hectare (Ha)"
          subheadline="Please list the units of measure you use throughout your operation, and convert to Ha"
        >
          <AreaTable />
        </Section>
      </CustomAccordion>

      {/* Account Types */}
      <CustomAccordion title="Account Types">
        <AccountTypesTable />
      </CustomAccordion>

      {/* Locations */}
      <CustomAccordion title="Locations">
        <LocationsTable />
      </CustomAccordion>

      {/* Yield Estimations */}
      <CustomAccordion title="Yield Estimations">
        <YieldEstimationsTable />
      </CustomAccordion>

      {/* Harvest Seasons */}
      <CustomAccordion title="Harvest Seasons">
        <HarvestSeasonsTable />
      </CustomAccordion>

      {/* Certifications */}
      <CustomAccordion title="Certifications">
        <CertificationsTable />
      </CustomAccordion>

      {/* Keyword Configuration */}
      <CustomAccordion title="Keyword Configuration">
        <KeywordConfigurationTable />
      </CustomAccordion>
    </Box>
  );
};

export default SavedSettings;
