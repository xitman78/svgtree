import React, { Component } from 'react'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import { closeSnackbar } from '../../actions/modalsActions'

class MySnackbar extends Component {

  render() {

      // let { snackbar, closeSnackbar } = this.props;

      return (<Snackbar
        open={ this.props.snackbar.get('open') || false }
        message={ this.props.snackbar.get('message') || 'Undefined' }
        autoHideDuration={ this.props.snackbar.get('duration') || 4000 }
        onRequestClose={ this.props.closeSnackbar }
        action="close"
        onActionTouchTap={this.props.closeSnackbar}
      />);
  }
}

export default connect(
  state => ({snackbar: state.getIn(['modals','snackbar'])}),
  { closeSnackbar }
)(MySnackbar);
