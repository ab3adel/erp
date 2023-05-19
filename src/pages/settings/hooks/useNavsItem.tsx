import { TreeNode } from "@/shared/components/treeview/GenericTreeView";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

export const useNavsItem = () => {
  const navs: TreeNode[] = [
    {
      label: "Your Account",
      nodeId: "/settings/account",
      icon: <PersonOutlineIcon sx={{ color: "inherit" }} />,
    },
    {
      label: "Businsess Account",
      nodeId: "/settings/businsess_account",
      icon: <CorporateFareIcon sx={{ color: "inherit" }} />,
    },
  ];
  return navs;
};
