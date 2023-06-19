import { Switch, styled } from "@mui/material";

export const CustomizedSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  transform: "rotate(180deg)",

  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,

    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
  },
  "& .MuiSwitch-switchBase": {
    color: "white !important",
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
  "& .Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.primary.main, // Apply background color when switched on
    opacity: 1,
  },
}));
