export const getExpandedNodesIds = (treeNodes: TreeNode[]) => {
  let expandedNodesIds: string[] = [];
  treeNodes.forEach((treeNode) => {
    if (treeNode?.expanded) {
      expandedNodesIds = [treeNode.nodeId];
    }
    if (Array.isArray(treeNode.children)) {
      const childrenKeys = getExpandedNodesIds(treeNode.children);
      expandedNodesIds = [...expandedNodesIds, ...childrenKeys];
    }
  });
  return expandedNodesIds;
};

type TreeNode = {
  nodeId: string;
  label: string;
  expanded?: boolean;
  children?: TreeNode[];
  key?: string;
};
