import HeaderToolbar from "@/pages/settings/views/business/components/HeaderToolbar";
import BackButton from "@/shared/components/BackButton";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

const NavigationContainer: FunctionComponent = () => {
  const navigate = useNavigate();

  const handleNavigateBack = () =>
    navigate("/settings/business/general/organization");

  return (
    <>
      <HeaderToolbar
        leftComponent={
          <BackButton variant="text" onClick={handleNavigateBack}>
            Organization
          </BackButton>
        }
      />
    </>
  );
};

export default NavigationContainer;
