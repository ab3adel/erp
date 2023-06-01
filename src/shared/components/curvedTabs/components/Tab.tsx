import { styled, Tab } from "@mui/material";

export const CurvedTab = styled(Tab)(({ theme }) => ({
  textTransform: "uppercase",
  fontWeight: 700,

  overflow: "visible",
  position: "relative",
  fontSize: 14,
  fontFamily: "Lato",
  marginRight: "-12px",
  backgroundColor: theme.palette.grey[300],
  color: theme.palette.text.disabled,
  padding: "10px 40px",
  borderRadius: "26px 25px 0 0",
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    "&::after": {
      boxShadow: "3px 3px 4px rgba(36, 40, 40, 0.12)",
      border: "none",
    },
    "&::before": {
      boxShadow: "-3px 3px 4px rgba(36, 40, 40, 0.12)",
      border: "none",
    },
  },
  "&::before , &::after": {
    content: '" "',
    position: "absolute",
    top: 0,
    width: "24px",
    height: "100%",
    backgroundColor: "inherit",
    boxShadow: "inherit",
  },
  "&::before": {
    borderRadius: "12px 0 0 0",
    transform: "skew(-24deg)",
    left: "-13px",
    borderLeft: "1px solid #b8b8b8",
  },
  "&::after": {
    borderRadius: "0 12px 0 0",
    transform: "skew(24deg)",
    right: "-13px",
    zIndex: 1,
    borderRight: "1px solid #b8b8b8",
  },
}));
