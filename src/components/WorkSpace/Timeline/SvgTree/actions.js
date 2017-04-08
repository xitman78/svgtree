import  React from 'react'

import simulateClick from 'helpers/simulateClick'

//const ReactTestUtils = React.addons.TestUtils;


export function toggleSvgTreeNode(indexPath) {
  return {
    type: 'TOGGLE_SVG_TREE_NODE',
    payload: { indexPath }
  };
}


export function simulateElementClick(id) {

  return function(dispatch) {
    setTimeout(() => {
      if (id) {
        let element = document.getElementById(id);
        if (element) {
          simulateClick(element);
          dispatch({type: 'SIMULATED_SELECTION', payload: null});
        }
      }
    },0);
  }

}
