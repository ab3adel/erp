import { DialogTitle, Typography } from "@mui/material";
import { FunctionComponent } from "react";

export interface DialogHeaderProps {
  label?: string;
  color?: "danger" | "default";
}

const DialogHeader: FunctionComponent<DialogHeaderProps> = (props) => {
  const { color, label } = props;

  const backgroundColor =
    color === "danger" ? "#BB2118" : color == "default" ? "#FFFFFF" : undefined;

  const textColor =
    color === "danger"
      ? "rgba(255, 255, 255, 1);"
      : color === "default"
      ? "#242828DE"
      : undefined;

  return (
    <DialogTitle
      style={{
        background: backgroundColor,
        paddingInline: 24,
        paddingBlock: 20,
        height: "auto",
      }}
    >
      <Typography variant="h6" fontWeight={500} fontSize={20} color={textColor}>
        {label}
      </Typography>
    </DialogTitle>
  );
};

export default DialogHeader;

DialogHeader.defaultProps = {
  color: "default",
};
