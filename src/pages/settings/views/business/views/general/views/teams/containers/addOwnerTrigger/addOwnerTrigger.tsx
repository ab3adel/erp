import { StarOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { useLogic } from "./addOwnerTrigger.logic";

const AddOwnerTrigger: FunctionComponent = () => {
  const { handleShowAddOwner } = useLogic();
  return (
    <Button
      startIcon={<StarOutline />}
      disableElevation={false}
      onClick={handleShowAddOwner}
    >
      Add Owner
    </Button>
  );
};

export default AddOwnerTrigger;
