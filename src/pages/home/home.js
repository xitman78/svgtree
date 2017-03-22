import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Helmet from 'react-helmet'
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

import { incrementComment, colorChecked } from '../../actions/actionCreator'
import DraggedField from '../../components/dragged-field'
import Dragged from '../../components/dragged'
import './home.sass'

const checkStyle = {marginBottom: 16, marginLeft: 16, marginRight: 22};


class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  // shouldComponentUpdate(nextProps) {
  //
  //   return (this.props.comments.hashCode() !== nextProps.comments.hashCode());
  //
  // }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    // this.setState({
    //   open: true,
    //   anchorEl: event.currentTarget,
    // });

    let inputField = this.refs.fileField;
    inputField.click();
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  onCheck(prop, ev, isChecked) {

    this.props.colorChecked(prop, isChecked);

  }

  render() {

    console.log('Render Home');

    const comments = this.props.comments.get('comments').toJS();
    return (
      <div>
          <Helmet title="SVG Tree" />
          <h2 className="page-title">Import</h2>
          <p>Drag and drop your SVG file here or click on the button bellow.</p>
          <RaisedButton
          onTouchTap={this.handleTouchTap.bind(this)}
          label="Upload SVG">
            <input className="inner-upload-button" ref="fileField" type="file" name="image1" accept=".svg" id="img1" />
          </RaisedButton>

          <div className="dragged-field-container">
            <DraggedField>
              <Dragged />
            </DraggedField>
          </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  comments: state => state.get('comments'),
  colors: state => state.getIn(['comments', 'checked']).toJS(),
});

export default connect(
  mapStateToProps,
  { incrementComment, colorChecked }
)(Home);
