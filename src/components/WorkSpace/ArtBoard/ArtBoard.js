import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { toogleSelection } from './actions'

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

    let elementBox = el.getBoundingClientRect(); //getBBox();

    let containerElement = this.refs['svg-board-container'];

    let boxContainer = containerElement.getBoundingClientRect();

    //console.log('elementBox', elementBox);
    //console.log('boxContainer', boxContainer);
    //console.log('refs', this.refs);

    let scale = this.props.artBoard.get('scale');

    let selectionBox = {
      x: (elementBox.left - boxContainer.left) / scale,
      y: (elementBox.top - boxContainer.top) / scale,
      width: (elementBox.width / scale ),
      height: (elementBox.height / scale ),
    };

    console.log('selectionBox', selectionBox);

    this.props.toogleSelection(pr.nativeEvent.target.id, selectionBox);

    //if(el && el.length) el[0].className += " selected-fill";
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

  renderSelections() {

  }


  render() {

    console.log('Render ArtBoard');

    let svg = this.props.svg;

    let scale = this.props.artBoard.get('scale');

    let width = this.props.artBoard.get('width') * scale + 'px';
    let height = this.props.artBoard.get('height') * scale + 'px';
    let wraperStyle = {width, height};
    let containerStyle =  svg ? { transform: `scale(${scale}` } : {display: 'none'};

    let selectionsMap  = this.props.artBoard.get('selectionsMap');

    return (
      <div className="atr-board-container">
        <div className="art-board-middle-wrapper" style={wraperStyle}>
         <div className="selection-container" style={wraperStyle}>
          {

            selectionsMap.map((value, key) => {
              let style = {left: value.x * scale, top: value.y * scale, width: value.width * scale, height: value.height * scale};
              console.log('style', style);
              return <div className="svg-selection" style={style} key={key}></div>
            })

           }
         </div>
          <div ref="svg-board-container" className="svg-show-container" style={containerStyle}>
            {svg ? (this.renderSvgNode(svg)) : ('No svg')}
          </div>
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
  { toogleSelection }
)(ArtBoard);
