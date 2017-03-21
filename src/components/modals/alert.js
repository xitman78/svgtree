import React from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
// import RaisedButton from 'material-ui/RaisedButton'
import { closeAlert } from '../../actions/modalsActions'

class ModalAlert extends React.Component {

  render() {

    console.log('Render Alert');

    const actions = [
      <FlatButton
        label={this.props.alert.get('buttonText') || 'Close'}
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.props.closeAlert}
      />
    ];

    return (
        <Dialog
          actions={this.props.alert.get('actions') || actions}
          modal={this.props.alert.get('modal') || false}
          title={this.props.alert.get('title')}
          open={this.props.alert.get('open')}
          onRequestClose={this.props.closeAlert}>
          {this.props.alert.get('message')}
        </Dialog>
    );
  }
}

export default connect(
   state => ({alert: state.getIn(['modals', 'alert'])}),
   { closeAlert }
 )(ModalAlert);
