import NavigateBackContainer from "@/pages/settings/components/NavigateBackContainer";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

const NavigationContainer: FunctionComponent = () => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    console.log("TestS");
    navigate("/settings/business/general/organization");
  };
  return (
    <>
      <NavigateBackContainer
        backLabel="Organization"
        onNavigateBackClick={handleNavigateBack}
      />
    </>
  );
};

export default NavigationContainer;
