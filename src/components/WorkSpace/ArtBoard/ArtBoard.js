import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './ArtBoard.sass'


class ArtBoard extends Component {


  renderSvgNode(svgNode) {

    //console.log('svgNode', svgNode);
    if (svgNode['tag'] === '#text') return svgNode['textContent'];

    let children = svgNode['children'];

    let childElements = children ? children.map(child => this.renderSvgNode(child)): [];

    return React.createElement(
      svgNode['tag'],
      svgNode['@props'],
      ...childElements
    );

  }


  render() {

    console.log('Render SvgShow');

    let svg = this.props.svg;

    return (
      <div className="svg-show-container">
        {svg ? (this.renderSvgNode(svg)) : ('No svg')}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  svg: state => state.getIn(['svgFile', 'parsedSvg']),
});

export default connect(
  mapStateToProps,
  {  }
)(ArtBoard);
