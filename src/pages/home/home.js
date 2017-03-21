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

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
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
          <Helmet title="React Magics" />
          <h2 className="page-title">Welcome home</h2>

          <ul style={{listStyleType: 'none'}}>
          {
            comments.map(cm => { return (
              <li key={cm.id} className="counter-item">{'Comment ' + cm.id + ' '}
                <button onClick={this.props.incrementComment.bind(null, cm.id)}>+</button>
                {' - ' + cm.count}
              </li>);
            })
          }
          </ul>
          <RaisedButton
          onTouchTap={this.handleTouchTap.bind(this)}
          label="Click me"
        />

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
          <Menu>
            <div><Checkbox
              label="Red"
              checked={this.props.colors.red}
              onCheck={this.onCheck.bind(this, 'red')}
              style={checkStyle}
            /></div>
            <div><Checkbox
              label="Green"
              checked={this.props.colors.green}
              onCheck={this.onCheck.bind(this, 'green')}
              style={checkStyle}
            /></div>
            <div><Checkbox
              label="Orange"
              checked={this.props.colors.orange}
              onCheck={this.onCheck.bind(this, 'orange')}
              style={checkStyle}
            /></div>
            <div><Checkbox
              label="Yellow"
              checked={this.props.colors.yellow}
              onCheck={this.onCheck.bind(this, 'yellow')}
              style={checkStyle}
            /></div>
          </Menu>
        </Popover>

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
