import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { swappedDrop } from '../actions/worksActions'
import Swapped from './swapped'
import './drop-container.sass'

class DropContainer extends Component {

  cunstructor() {
    console.log('123');
  }

  static propTypes = {
    dropId: PropTypes.string.isRequired,
  }

  allowDrop(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy"
  }

  drop(ev) {
    console.log('Drop ' + this.props.dropId);
    ev.preventDefault();
    this.props.swappedDrop(ev.dataTransfer.getData('text'), this.props.dropId);
  }

  render() {
      return (
        <div className="drop-container" onDragOver={this.allowDrop} onDrop={this.drop.bind(this)}>
          {this.props.swapper.get(this.props.dropId) ? <Swapped pos={this.props.dropId} /> : null}
        </div>
      );
  }

}


const mapStateToProps = createStructuredSelector({
  swapper: state => state.getIn(['works', 'swapper'])
});

export default connect(
  mapStateToProps,
  { swappedDrop }
)(DropContainer);
