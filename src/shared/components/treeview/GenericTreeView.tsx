import { TreeView, TreeViewProps } from "@mui/lab";
import { useCallback, useEffect, useMemo } from "react";
import { GenericTreeItem } from "./components";
import { GenericTreeViewDefaultIcon } from "./components/GenericTreeViewDefaultIcon";
import { getExpandedNodesIds } from "./utils/getExpandedNodesIds";
import {useLocation} from 'react-router-dom'
let routes =[
  'management',
  'approved-inverntory',
  'relationships',
  'accounts',
  'customview',
  'traceability'
]
export const GenericTreeView = ({
  treeNodes,
  onNodeClick,
  ...props
}: GenericTreeViewProps) => {
  const location=useLocation()
  const defaultExpanded = useMemo(
    () => getExpandedNodesIds(treeNodes),
    [treeNodes]
  );
  const handleNodeClick = useCallback(
    (key: string, isLeaf?: boolean) => {
      onNodeClick?.(key, isLeaf);
    },
    [onNodeClick]
  );

  return (
    <TreeView
      defaultExpanded={defaultExpanded}
      defaultCollapseIcon={<GenericTreeViewDefaultIcon type="collapsed" />}
      defaultExpandIcon={<GenericTreeViewDefaultIcon type="expanded" />}
      sx={{
        height: "100%",
        width: "100%",
        overflowY: "auto",
      }}
      {...props}
    >
      {treeNodes.map((treeNode) => 
       { 
       
       return ( <GenericTreeItem
          key={treeNode.nodeId}
          treeNode={treeNode}
          onNodeClick={handleNodeClick}
        
         sx= {location.pathname=== treeNode.nodeId ?
          {
            backgroundColor: `#008E8F14`,
             color: "#008E8F",
          }
          :{}
        }
        />)}
      )}
    </TreeView>
  );
};

type GenericTreeViewProps = TreeViewProps & {
  /**
   * TreeNode which represents the parent of the tree
   */
  treeNodes: TreeNode[];
  /**
   * Callback fired when clicking on the tree item with nodeId or the key (if its defined) as paramater
   */
  onNodeClick?: (key: string, isLeaf?: boolean) => void;
};

export type TreeNode = {
  nodeId: string;
  label: string;
  expanded?: boolean;
  children?: TreeNode[];
  icon?: React.ReactNode;
};
