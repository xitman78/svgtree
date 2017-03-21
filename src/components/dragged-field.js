import React, { Component } from 'react'
import './dragged-field.sass'

class DraggedField extends Component {

  render() {
      return (
        <div className="dragged-field">
          {this.props.children}
        </div>
      );
  }

}

export default DraggedField;
