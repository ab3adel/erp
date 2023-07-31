/* eslint-disable react-refresh/only-export-components */
import { TreeItem, TreeItemProps, treeItemClasses } from "@mui/lab";
import { styled, Box } from "@mui/material";
import { memo } from "react";

const GenericTreeItem = ({
  treeNode,
  onNodeClick,
  focused,
  ...props
}: GenericTreeItemProps) => {
  const handleItemClick = () => {
    const key = !treeNode.children
      ? treeNode.nodeId
      : treeNode.children[0].nodeId;
    const isLeaf = !treeNode.children;
    onNodeClick(key, isLeaf);
  };

  return (
    <StyledTreeItemRoot
      {...props}
      nodeId={treeNode.nodeId}
      label={
        <Box display="flex" alignItems="center" columnGap={1}>
          {treeNode.icon}
          {treeNode.label}
        </Box>
      }
      onClick={handleItemClick}
      sx= {location.pathname === treeNode.nodeId?
        {[`& .${treeItemClasses.content}`]:{
          backgroundColor: `#008E8F14`,
           color: "#008E8F",
        }
        }
        :{ 
        }
      }
    >
      {Array.isArray(treeNode.children)
        ? treeNode.children.map((node) => {
          console.log(node.nodeId,location.pathname,node.label)
            return (<GenericTreeItem
              treeNode={node}
              onNodeClick={onNodeClick}
              key={node.nodeId}
            
              
              {...props}
            />)
            })
        : null}
    </StyledTreeItemRoot>
  );
};

export default memo(GenericTreeItem);

const StyledTreeItemRoot = styled(TreeItem, {
  shouldForwardProp: (prop) => prop !== "expanded",
})(({ theme }) => ({
  color: theme.palette.text.secondary,

  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.common.black,
    flexFlow: "row-reverse",
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5),
    fontWeight: theme.typography.fontWeightRegular,
 
    "&.Mui-expanded": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    // "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
    //   backgroundColor: `#008E8F14`,
    //   color: theme.palette.primary.main,
    // },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

type GenericTreeItemProps = Omit<TreeItemProps, "nodeId"> & {
  treeNode: TreeNode;
  onNodeClick: (key: string, isLeaf?: boolean) => void;
  focused?:boolean
};

type TreeNode = {
  nodeId: string;
  label: string;
  expanded?: boolean;
  children?: TreeNode[];
  icon?: React.ReactNode;
};
