import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import { PersonAddOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface AddTeamMemberButtonContainerProps {}

const AddTeamMemberButtonContainer: FunctionComponent<
  AddTeamMemberButtonContainerProps
> = () => {
  return (
    <Link to="/settings/business/general/teams/add">
      <Button variant="outlined" startIcon={<PersonAddOutlined />}>
        new team member
      </Button>
    </Link>
  );
};

export default AddTeamMemberButtonContainer;
