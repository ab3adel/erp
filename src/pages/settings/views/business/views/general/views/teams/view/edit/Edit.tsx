import PageSectionContainer from "@/pages/settings/components/SectionContainer";
import { FunctionComponent } from "react";
import Permissions from "../../components/Permissions/Permissions";
import HeaderToolbar from "@/pages/settings/views/business/components/HeaderToolbar";
import BackButton from "@/shared/components/BackButton";
import { Box, Button } from "@mui/material";
import { useLogic } from "./Edit.logic";

const Edit: FunctionComponent = () => {
  const {
    email,
    handleNavigateToTeams,
    abilitiesValue,
    groupedAbilites,
    handleAbilitesChange,
    handleConfirm,
    handlePermissionInputChange,
    handleShowCustomizationPanelsChange,
    handleShowPanelChange,
    isValidEmail,
    permissionValue,
    setEmail,
    showCustomizationPanels,
    shownPanels,
    loading,
    isChangedForm,
  } = useLogic();

  return (
    <PageSectionContainer>
      <HeaderToolbar
        leftComponent={
          <BackButton variant="text" onClick={handleNavigateToTeams}>
            all team members
          </BackButton>
        }
      />
      <Permissions
        groupedAbilites={groupedAbilites}
        value={abilitiesValue}
        shownPanels={shownPanels?.split(",") ?? []}
        onShowPanelChange={handleShowPanelChange}
        onAbilitesChange={(value) =>
          handleAbilitesChange(value.subcategory, value.abilities)
        }
        showCustomizationPanels={showCustomizationPanels}
        onCustomizedPermissionButtonClick={handleShowCustomizationPanelsChange}
        onPermissionInputChange={handlePermissionInputChange}
        permissionValue={permissionValue}
        containerProps={{ my: 3 }}
        mode="edit"
        emailFieldProps={{
          value: email,
          onChange: (e) => setEmail(e.currentTarget.value),
        }}
      />
      <Box>
        <Button
          onClick={handleConfirm}
          disabled={!isValidEmail || loading || !isChangedForm}
        >
          save changes
        </Button>
      </Box>
    </PageSectionContainer>
  );
};

export default Edit;
