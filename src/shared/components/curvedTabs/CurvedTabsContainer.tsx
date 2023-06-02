import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";

export const CurvedTabsContainer = ({ children }: PropsWithChildren) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "0px 12px 12px 12px",
        boxShadow: "2px 2px 4px  rgba(36, 40, 40, 0.12)",
      }}
    >
      {children}
    </Paper>
  );
};
