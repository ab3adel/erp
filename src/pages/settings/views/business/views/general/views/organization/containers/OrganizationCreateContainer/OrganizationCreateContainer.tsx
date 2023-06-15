import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import plusIcon from "@/assets/images/plus-icon.svg";
import MultiOrganizationManagmentDialog from "../../components/multi-organization-managment-dialog/MultiOrganizationManagmentDialog";
import { useLogic } from "./OrganizationCreateContainer.logic";

const OrganizationCreateContainer: FunctionComponent = () => {
  const { showDialog, handleShowDialog, handleClose } = useLogic();
  return (
    <>
      <Button
        onClick={handleShowDialog}
        disableElevation={false}
        startIcon={<img src={plusIcon} />}
      >
        new organization
      </Button>
      <MultiOrganizationManagmentDialog
        open={showDialog}
        closeButtonProps={{ onClick: handleClose }}
      />
    </>
  );
};

export default OrganizationCreateContainer;
