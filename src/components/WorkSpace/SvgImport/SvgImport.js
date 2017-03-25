import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './SvgImport.sass'


class SvgImport extends Component {



  render() {

    console.log('Render SvgImport');

    let name = this.props.svgFile.get('name');
    let size = this.props.svgFile.get('size');
    let content = this.props.svgFile.get('content');
    let type = this.props.svgFile.get('type');
    let error = this.props.svgFile.get('error');

    return (
      <div>
          <h2 className="page-title">Import</h2>
          <p>Drag and drop your SVG file here or click on the button bellow.</p>

          { size >= 0 &&
            <div className="svg-file-info">
              File Info:<br />
              Name: {name}<br />
              Type: {type}<br />
              Size: {size}<br />
              <pre>{content}</pre>
            </div>
          }

          {error &&
            <div className="svg-file-info">
            Error reading file: { JSON.stringify(error) }
            </div>
          }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  svgFile: state => state.get('svgFile'),
});

export default connect(
  mapStateToProps,
  { }
)(SvgImport);
