import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import { readSvgFile } from '../SvgImport/actions'
import { scaleSteps } from 'helpers/artBoardConsts'
import { increaseScale, decreaseScale, setScale} from './actions'

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

   changeScale(pr, i, val) {

     //console.log('change', arguments);
     this.props.setScale(val);

   }

  render() {

    return (
      <div className="toolbar-wrapper">
        <Toolbar>
          <ToolbarGroup>
            <FlatButton
            onTouchTap={this.handleTouchTap.bind(this)}
            icon={<FontIcon className="material-icons">file_upload</FontIcon>}
            primary={true}
            label="Upload SVG">
              <input
                onChange={this.onSvgFileChange.bind(this)}
                className="inner-upload-button"
                ref="fileField" type="file"
                name="svg_file"
                accept=".svg"
                id="svg_file_upload" />
            </FlatButton>
            <ToolbarSeparator />
            <IconButton tooltip="Zoom In" onClick={this.props.increaseScale} disabled={!this.props.enableZoomIn}>
              <FontIcon className="material-icons">add_circle_outline</FontIcon>
            </IconButton>
            <IconButton tooltip="Zoom Out" onClick={this.props.decreaseScale} disabled={!this.props.enableZoomOut}>
              <FontIcon className="material-icons">remove_circle_outline</FontIcon>
            </IconButton>
            <DropDownMenu maxHeight={300} value={this.props.scale} onChange={this.changeScale.bind(this)}>
            { scaleSteps.map((step, i) => <MenuItem value={step} key={i + 1} primaryText={step * 100.0 + '%'} />)}
            </DropDownMenu>
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

const mapStateToProps = createStructuredSelector({
  scale: state => state.getIn(['artBoard', 'scale']),
  enableZoomIn: state => state.getIn(['artBoard', 'enableZoomIn']),
  enableZoomOut: state => state.getIn(['artBoard', 'enableZoomOut'])
});

export default connect(
  mapStateToProps,
  { readSvgFile, increaseScale, decreaseScale, setScale }
)(ToolBar);
