import PageSectionContainer from "@/pages/settings/components/SectionContainer";
import { FunctionComponent } from "react";
import Stepper from "./components/Stepper";
import EmailInsertion from "./components/main/EmailInsertion";
import ActionBar from "./components/ActionBar";
import { Box } from "@mui/material";
import Permissions from "../../components/Permissions/Permissions";
import Overview from "./components/main/overview/Overview";
import Acknowledge from "./components/main/Acknowledge";
import { useLogic } from "./Create.logic";

const Create: FunctionComponent = () => {
  const {
    organiztionName,
    email,
    setEmail,
    currentStep,
    handleConfirm,
    handleBack,
    handleCancel,
    isValidEmail,
    groupedAbilites,
    abilitiesValue,
    shownPanels,
    handleShowPanelChange,
    handleAbilitesChange,
    showCustomizationPanels,
    handleShowCustomizationPanelsChange,
    selectedAbilites,
    handlePermissionInputChange,
    permissionValue,
    loadingAddMember,
  } = useLogic();

  return (
    <Box>
      <Box px={18} py={4} minHeight="calc(100vh - 290px)">
        <PageSectionContainer disableGutter>
          <Box mx={3}>
            <Stepper activeStep={currentStep} />
          </Box>
          {currentStep === 0 && (
            <EmailInsertion
              name={organiztionName ?? ""}
              email={email}
              onEmailChange={(e) => setEmail(e.currentTarget.value)}
            />
          )}

          {currentStep === 1 && (
            <Permissions
              groupedAbilites={groupedAbilites}
              email={email}
              organizationName={organiztionName ?? ""}
              value={abilitiesValue}
              shownPanels={shownPanels}
              onShowPanelChange={handleShowPanelChange}
              onAbilitesChange={(value) =>
                handleAbilitesChange(value.subcategory, value.abilities)
              }
              showCustomizationPanels={showCustomizationPanels}
              onCustomizedPermissionButtonClick={
                handleShowCustomizationPanelsChange
              }
              onPermissionInputChange={handlePermissionInputChange}
              permissionValue={permissionValue}
            />
          )}
          {currentStep === 2 && (
            <Overview
              email={email}
              organiztionName={organiztionName ?? ""}
              selectedAbilities={selectedAbilites ?? []}
            />
          )}
          {currentStep === 3 && (
            <Acknowledge
              email={email}
              organiztionName={organiztionName ?? ""}
            />
          )}
        </PageSectionContainer>
      </Box>
      <ActionBar
        backButtonProps={{ onClick: handleBack }}
        cancelButtonProps={{ onClick: handleCancel }}
        confirmButtonProps={{
          onClick: handleConfirm,
          disabled:
            !isValidEmail ||
            loadingAddMember ||
            (abilitiesValue.length === 0 && currentStep == 1),
        }}
        // onBack={handleBack}
        // onCancel={handleCancel}
        // onConfirm={handleConfirm}
        showBackButton={currentStep > 0 && currentStep < 3}
        showCancelButton={currentStep < 3}
        confirmButtonLabel={
          currentStep === 2
            ? "Send Invite"
            : currentStep === 3
            ? "Done"
            : undefined
        }
        confirmButtonIconPlace={currentStep === 3 ? "start" : "end"}
        confirmButtonIcon={currentStep === 3 ? "check" : "arrow"}
      />
    </Box>
  );
};

export default Create;
