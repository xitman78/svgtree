import React from 'react'
import { connect } from 'react-redux'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import { readSvgFile } from '../SvgImport/actions.js'

import './ToolBar.sass'

class ToolBar extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
       value: 3,
     };
   }

   handleMenuChange(ev, i, val) {
     this.setState({value: val});
   }

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
    return (
      <div className="toolbar-wrapper">
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Import your SVG graphics" />
            <FontIcon className="muidocs-icon-custom-sort" />
            <ToolbarSeparator />
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
            <IconMenu
              iconButtonElement={
                <IconButton touch={true}>
                  <NavigationExpandMoreIcon />
                </IconButton>
              }
            >
              <MenuItem primaryText="Download" />
              <MenuItem primaryText="More Info" />
            </IconMenu>
          </ToolbarGroup>
          <ToolbarGroup firstChild={true}>
            <DropDownMenu value={this.state.value} onChange={this.handleMenuChange.bind(this)}>
              <MenuItem value={1} primaryText="All Broadcasts" />
              <MenuItem value={2} primaryText="All Voice" />
              <MenuItem value={3} primaryText="All Text" />
              <MenuItem value={4} primaryText="Complete Voice" />
              <MenuItem value={5} primaryText="Complete Text" />
              <MenuItem value={6} primaryText="Active Voice" />
              <MenuItem value={7} primaryText="Active Text" />
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }

}

export default connect(
  null,
  { readSvgFile }
)(ToolBar);
