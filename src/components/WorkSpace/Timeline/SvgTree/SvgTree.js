import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { toggleSvgTreeNode } from './actions'

import './SvgTree.sass'

const iconPaths = {
  path: 'M0.959,8.937c0,0,0.203-2.86,2.056-3.959 c1.853-1.098,3.259-0.059,4.717-1.108c1.458-1.049,1.483-2.85,1.483-2.85',
  rect: 'M1 1 L9 1 L9 9 L1 9Z',
  polygon: 'M5 1.204 L9.278 8.531 L0.721 8.531Z',
  circle: 'M5,9.078C2.748,9.078,0.922,7.252,0.922,5S2.748,0.922,5,0.922S9.078,2.748,9.078,5C9.078,7.252,7.252,9.078,5,9.078'
};


class SvgTree extends React.Component {

  toggleNode(indexPath) {
    this.props.toggleSvgTreeNode(indexPath);
  }

  renderNode(node, level, indexPath) {
    let tag = node.get('tag');
    let id = node.getIn(['@props', 'id']);
    let children = node.get('children');
    let collapsed = node.get('collapsed');

    // console.log('id', id);

    if (tag === '#text') {
      return <div className="svg-tree-text-content" key={indexPath.join('-')}>{node.get('textContent')}</div>;
    }

    let path = iconPaths[tag];

    if (tag === 'g') tag = 'group';

    if (!/^svr_id_/.test(id)) tag += ` "${id}"`; //show id as name if not generated

    let arrowPathClass = 'svg-tree-arrow-path ' + ((collapsed) ? 'collapsed': 'opened');

    if (!children && !path) arrowPathClass += ' childless';

    if (!path) path = 'M2 1 L7 5 L2 9';

    let selected = this.props.selectionsMap.get(id);

    return (
      <div className="svg-tree-node" key={indexPath.join('-')}>
        <div className={selected ? 'selected-node' : ''}>
          <span className="title" onClick={this.toggleNode.bind(this, indexPath)}>
            <svg className="svg-tree-arrow" viewBox="0 0 10 10" width="10px" height="10px">
              <path className={arrowPathClass} d={path}/>
            </svg>
            {tag}
          </span>
        </div>
        {children && !collapsed && children.map((n,i) => this.renderNode(n, level + 1, indexPath.concat(i)))}
      </div>
    );
  }

  render() {

    let svgDoc = this.props.svgDoc;
    return(
      <div className="svg-tree-container">
        <div className="svg-tree-content">
        { svgDoc && svgDoc.get('children') && svgDoc.get('children').map((node, i) => this.renderNode(node, 0, [i]))}
        </div>
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  svgDoc: state => state.getIn(['artBoard', 'svgDoc']),
  selectionsMap: state => state.getIn(['artBoard', 'selectionsMap']),
});

export default connect(mapStateToProps, { toggleSvgTreeNode })(SvgTree);
