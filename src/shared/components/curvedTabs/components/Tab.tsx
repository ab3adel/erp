import { styled, Tab } from "@mui/material";

export const CurvedTab = styled(Tab)(({ theme }) => ({
  textTransform: "uppercase",
  fontWeight: 700,

  overflow: "visible",
  position: "relative",
  fontSize: 14,
  fontFamily: "Lato",
  marginRight: "-12px",
  backgroundColor: theme.palette.grey[200],
  color: "rgba(36, 40, 40, 0.38)",
  padding: "10px 50px",
  borderTop: "1px solid #E0E0E0",
  borderRadius: "26px 25px 0 0",
  "&:hover": {
    borderTop: "1px solid rgba(0, 142, 143, 0.5)",
    color: "#33A4A5",
    "&::before": {
      borderLeft: "1px solid rgba(0, 142, 143, 0.5)",
      borderTop: "1px solid rgba(0, 142, 143, 0.5)",
    },
    "&::after": {
      borderRight: "1px solid rgba(0, 142, 143, 0.5)",
      borderTop: "1px solid rgba(0, 142, 143, 0.5)",
    },
  },
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    border: "none",
    boxShadow: "3px 3px 4px rgba(36, 40, 40, 0.12)",
    zIndex: 1,
    "&::after": {
      boxShadow: "3px 3px 4px rgba(36, 40, 40, 0.12)",
      border: "none",
      paddingBottom: "0px",
    },
    "&::before": {
      boxShadow: "-3px 3px 4px rgba(36, 40, 40, 0.12)",
      border: "none",
      paddingBottom: "0px",
    },
  },
  "&::before , &::after": {
    content: '" "',
    position: "absolute",
    width: "24px",
    height: "100%",
    backgroundColor: "inherit",
    boxShadow: "inherit",
    paddingBottom: "48px",
  },
  "&::before": {
    borderRadius: "12px 0 0 0",
    transform: "skew(-24deg)",
    left: "-11px",
    borderLeft: "1px solid #E0E0E0",
    borderTop: "1px solid #E0E0E0",
  },
  "&::after": {
    borderRadius: "0 12px 0 0",
    transform: "skew(24deg)",
    right: "-11px",
    zIndex: 1,
    borderRight: "1px solid #E0E0E0",
    borderTop: "1px solid #E0E0E0",
  },
}));
