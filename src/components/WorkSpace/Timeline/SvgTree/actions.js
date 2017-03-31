export function toggleSvgTreeNode(indexPath) {
  return {
    type: 'TOGGLE_SVG_TREE_NODE',
    payload: { indexPath }
  };
}
