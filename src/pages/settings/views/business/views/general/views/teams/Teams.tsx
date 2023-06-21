import PageSectionContainer from "@/pages/settings/components/SectionContainer";
import { FunctionComponent } from "react";
import HeaderToolbar from "../../../../components/HeaderToolbar";
import { Button, Divider, Typography } from "@mui/material";
import StarOutline from "@mui/icons-material/StarOutline";
import BusinessIcon from "@mui/icons-material/Business";
import { Box } from "@mui/material";
import TeamsRoleTable from "./components/TeamsRoleTable";
import RemoveMemberDialog from "./components/RemoveMemberDialog";
import AddOwnerDialog from "./components/AddOwnerDialog";
import DeactivateMemberDialog from "./components/DeactivateMemberDialog";
import AddTeamMemberButtonContainer from "../../containers/AddTeamMemberButtonContainer";
import { useLogic } from "./Teams.logic";
import { modulesImages } from "@/shared/enums/modules-images";

const Teams: FunctionComponent = () => {
  const {
    data,
    memberIdToDelete,
    handleSetMemberToDelete,
    memberToDeleteInfo,
    organization,
    handleCancelDelete,
    handleConfirmDeleteUser,
    loadingDeleting,
    showAddOwnerDialog,
    handleShowAddOwner,
    handleCancelAddOwner,
    addOwnerEmail,
    handleConfirmAddOwner,
    handleEmailChange,
    isOwnerEmailValid,
    loadingAddOwner,
    handleSetMemberToDeactivate,
    memberIdToDeactivate,
    handleCancelDeactivate,
    memberToDeactivateInfo,
    handleConfirmDeactivateUser,
    loadingUpdateUser,
    handleActivateMember,
  } = useLogic();

  return (
    <PageSectionContainer>
      <RemoveMemberDialog
        open={Boolean(memberIdToDelete)}
        confirmButtonProps={{
          onClick: handleConfirmDeleteUser,
          disabled: loadingDeleting,
        }}
        onCancelClick={handleCancelDelete}
        name={memberToDeleteInfo?.name ?? ""}
        email={memberToDeleteInfo?.email ?? ""}
        organization={organization?.organization.company_name ?? ""}
      />
      <AddOwnerDialog
        open={showAddOwnerDialog}
        confirmButtonProps={{
          onClick: handleConfirmAddOwner,
          disabled: !isOwnerEmailValid || loadingAddOwner,
        }}
        onCancelClick={handleCancelAddOwner}
        emailFieldProps={{
          value: addOwnerEmail,
          onChange: (e) => handleEmailChange(e.currentTarget.value),
        }}
      />

      <DeactivateMemberDialog
        open={Boolean(memberIdToDeactivate)}
        onCancelClick={handleCancelDeactivate}
        confirmButtonProps={{
          onClick: handleConfirmDeactivateUser,
          disabled: loadingUpdateUser,
        }}
        name={memberToDeactivateInfo?.name ?? ""}
        organization={organization?.organization.company_name ?? ""}
      />

      <HeaderToolbar
        leftComponent={
          <Typography
            variant="h6"
            fontWeight={500}
            fontSize={20}
            color="rgba(36, 40, 40, 0.87)"
          >
            Team Roles
          </Typography>
        }
        rightComponent={
          <Button
            startIcon={<StarOutline />}
            disableElevation={false}
            onClick={handleShowAddOwner}
          >
            Add Owner
          </Button>
        }
      />

      <HeaderToolbar
        leftComponent={
          <Box display="flex" gap={1}>
            <BusinessIcon />

            <Typography variant="body1" fontWeight={400}>
              Long Miles Burundi
            </Typography>
          </Box>
        }
      />
      <Box mt={2} mb={3}>
        <Divider />
      </Box>

      <TeamsRoleTable
        disableActivateButton={loadingUpdateUser}
        onActivateClick={handleActivateMember}
        onDeleteClick={handleSetMemberToDelete}
        onDeactivivateClick={handleSetMemberToDeactivate}
        data={data?.users.data.map((item) => ({
          id: item.id,
          permissions: item.abilities.map((ability) => ability.title),
          modules: item.modules.map((item) => modulesImages[item]),
          entity: {
            email: item.email,
            name: item.name,
            is_active: item.is_active,
          },
          role: item.role,
        }))}
      />
      <Box mt={2}>
        <AddTeamMemberButtonContainer />
      </Box>
    </PageSectionContainer>
  );
};

export default Teams;
