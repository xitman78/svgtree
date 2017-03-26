import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './ArtBoard.sass'

const excludedTagsForClick = {
  'g': true,
  'svg': true,
  'style': true
};


class ArtBoard extends Component {


  onElementClick(pr, ev) {
    console.log('Element click', pr.nativeEvent);
    pr.nativeEvent.preventDefault();
    pr.nativeEvent.stopPropagation();

    //pr.nativeEvent.target.className += " selected-fill";

    let el = document.getElementById(pr.nativeEvent.target.id);

    if(el && el.length) el[0].className += " selected-fill";
  }


  renderSvgNode(svgNode) {

    //console.log('svgNode', svgNode);
    if (svgNode['tag'] === '#text') return svgNode['textContent'];

    let children = svgNode['children'];

    if (!svgNode['@props']) svgNode['@props'] = [];

    if (!excludedTagsForClick[svgNode['tag'].toLowerCase()]) {
      svgNode['@props'].onClick = this.onElementClick.bind(this);
    }

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

    let scale = this.props.artBoard.get('scale');
//width: svg['@props'].width, height: svg['@props'].height,
    let containerStyle =  svg ? { width: svg['@props'].width, height: svg['@props'].height, transform: `scale(${scale}` } : {display: 'none'};

    return (
      <div className="atr-board-container">
        <div className="svg-show-container" style={containerStyle}>
          {svg ? (this.renderSvgNode(svg)) : ('No svg')}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  svg: state => state.getIn(['svgFile', 'parsedSvg']),
  artBoard: state => state.get('artBoard')
});

export default connect(
  mapStateToProps,
  {  }
)(ArtBoard);