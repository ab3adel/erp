import { styled, Tabs } from "@mui/material";

export const CurvedTabList = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-scroller .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTabs-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiTabs-scroller button:not(:first-child)": {
    margin: "0 40px",
  },
}));
