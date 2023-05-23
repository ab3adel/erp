import { styled, Tab } from "@mui/material";

export const CurvedTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 700,

  overflow: "visible",
  position: "relative",
  fontSize: 18,
  marginRight: "-12px",
  backgroundColor: theme.palette.grey[300],
  color: theme.palette.text.disabled,
  padding: "10px 40px",
  borderRadius: "26px 25px 0 0",
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
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
  },
  "&::after": {
    borderRadius: "0 12px 0 0",
    transform: "skew(24deg)",
    right: "-13px",
    zIndex: 1,
  },
}));
