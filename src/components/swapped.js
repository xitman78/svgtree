import React, { Component, PropTypes } from 'react'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import './swapped.sass'

class Swapped extends Component {

  static propTypes = {
    pos: PropTypes.string.isRequired,
  }

  draggStart(event) {
    event.dataTransfer.setData('text', this.props.pos);
  }

  render() {
      return (
        <Chip draggable="true" onDragStart={this.draggStart.bind(this)} style={{cursor: 'pointer'}}>
        <Avatar size={32}>{this.props.pos === 'left' ? 'A' : 'B'}</Avatar>
          Child in {this.props.pos}
        </Chip>
      );
  }

}


export default Swapped;
