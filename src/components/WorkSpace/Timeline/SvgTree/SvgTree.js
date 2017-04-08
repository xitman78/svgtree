import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { toggleSvgTreeNode, simulateElementClick } from './actions'
import iconPaths from './svgIcoPaths'

import './SvgTree.sass'


class SvgTree extends React.Component {

  toggleNode(indexPath) {
    this.props.toggleSvgTreeNode(indexPath);
  }

  toggleSelection(id) {
    this.props.simulateElementClick(id);
  }

  renderNode(node, level, indexPath) {
    let tag = node.get('tag');
    let id = node.getIn(['@props', 'id']);
    let children = node.get('children');
    let collapsed = node.get('collapsed');

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
          <svg className="svg-tree-arrow" viewBox="0 0 10 10" width="10px" height="10px" onClick={this.toggleNode.bind(this, indexPath)}>
            <path className={arrowPathClass} d={path}/>
          </svg>
          <span className="title" onClick={this.toggleSelection.bind(this, id)}>
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

export default connect(mapStateToProps, { toggleSvgTreeNode, simulateElementClick })(SvgTree);
