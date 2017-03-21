import React, { Component }  from 'react'
import './font-face.sass'

export default class MainHeader extends Component {

  shouldComponentUpdate(nextProps) {
    return false; //static component
  }

  render() {

    console.log('Render Header');

    return (
      <h1 className="main-brand">
      3D Reactor
      </h1>
    );
  }
}
