import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { fireAlert, fireSnackbar, closeAlert } from '../actions/modalsActions'
import { draggedMoved } from '../actions/actionCreator'
import './dragged.sass'

class Dragged extends Component {

  componentWillMount() {
    this.setState({x: this.props.dragged.get('x'), y: this.props.dragged.get('y')});
  }

  startDragging(event) {

    if(this.state.dragStarted) {
      console.log('Drag already started');
      return;
    }

    let ov = event.nativeEvent;

    this.setState({...this.state, dragStarted: true, lastX: ov.pageX, lastY: ov.pageY });

    let moveHandler = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      if(this.state.dragStarted) {
        let offsetX = this.state.lastX - ev.pageX;
        let offsetY = this.state.lastY - ev.pageY;
        this.setState({dragStarted: true, x: (this.state.x - offsetX), y: (this.state.y - offsetY), lastX: ev.pageX, lastY: ev.pageY });
      }
   };

   let upHandler = (ev) => {
     ev.preventDefault();
     ev.stopPropagation();
     if(this.state.dragStarted) {
       let offsetX = this.state.lastX - ev.pageX;
       let offsetY = this.state.lastY - ev.pageY;
       let x = (this.state.x - offsetX);
       let y = (this.state.y - offsetY);
       this.setState({dragStarted: false, x , y });
       window.removeEventListener('mousemove', moveHandler);
       window.removeEventListener('mouseup', upHandler);
       this.props.fireSnackbar({message: 'Possition changed!'});
       this.props.draggedMoved(x, y);
     }
   };

   window.addEventListener('mousemove', moveHandler);
   window.addEventListener('mouseup', upHandler);

  }

  render() {
      return (
        <div className="dragged-element"
          style={{left: this.state.x, top: this.state.y}}
          onMouseDown={this.startDragging.bind(this)}></div>
      );
  }

}

// export default Dragged;
const mapStateToProps = createStructuredSelector({
  dragged: state => state.get('dragged')
});

export default connect(
  mapStateToProps,
  { fireAlert, fireSnackbar, closeAlert, draggedMoved }
)(Dragged);
