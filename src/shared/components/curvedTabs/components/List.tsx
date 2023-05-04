import { styled, Tabs } from "@mui/material";

export const CurvedTabList = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-scroller .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTabs-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiTabs-scroller button": {
    margin: 0,
  },
  "& .MuiTabs-scroller button:nth-child(2)": {
    margin: "0 40px",
  },
  [`& .MuiTabs-scroller button:not(:first-child):not(:last-child)`]: {
    margin: "0 40px",
  },
}));
