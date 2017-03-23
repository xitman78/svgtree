import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import RaisedButton from 'material-ui/RaisedButton';

import { readSvgFile } from './actions.js'
import './SvgImport.sass'


class SvgImport extends Component {

  handleTouchTap = (event) => {
    event.preventDefault();

    let inputField = this.refs.fileField;
    inputField.click();
  };


  onSvgFileChange(ev) {
    if (ev.nativeEvent.target.files.length) {
        this.props.readSvgFile(ev.nativeEvent.target.files[0]);
    }
  }

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
          <RaisedButton
          onTouchTap={this.handleTouchTap.bind(this)}
          label="Upload SVG">
            <input
              onChange={this.onSvgFileChange.bind(this)}
              className="inner-upload-button"
              ref="fileField" type="file"
              name="svg_file"
              accept=".svg"
              id="svg_file_upload" />
          </RaisedButton>

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
  { readSvgFile }
)(SvgImport);
