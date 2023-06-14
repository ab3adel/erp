import { Button, ButtonProps } from "@mui/material";
import { FunctionComponent } from "react";
import arrowLeftIcon from "@/assets/images/arrow-left.svg";

const BackButton: FunctionComponent<ButtonProps> = (props) => {
  return (
    <Button variant="text" startIcon={<img src={arrowLeftIcon} />} {...props} />
  );
};

export default BackButton;
