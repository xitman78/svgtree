import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { toggleSvgTreeNode } from './actions'

import './SvgTree.sass'


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

    if (tag === 'g') tag = 'group';

    if (!/^svr_id_/.test(id)) tag += ` "${id}"`; //show id as name if not generated

    let arrowPathClass = 'svg-tree-arrow-path ' + ((collapsed) ? 'collapsed': 'opened');

    if (!children) arrowPathClass += ' childless';

    return (
      <div className="svg-tree-node" key={indexPath.join('-')}>
        <div>
          <span className="title" onClick={this.toggleNode.bind(this, indexPath)}>
            <svg className="svg-tree-arrow" viewBox="0 0 10 10" width="10px" height="10px">
              <path className={arrowPathClass} d="M2 1 L7 5 L2 9"/>
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
  svgDoc: state => state.getIn(['artBoard', 'svgDoc'])
});

export default connect(mapStateToProps, { toggleSvgTreeNode })(SvgTree);
