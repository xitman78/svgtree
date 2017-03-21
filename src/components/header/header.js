import React, { Component }  from 'react'
import './header.sass'

export default class MainHeader extends Component {

  shouldComponentUpdate(nextProps) {
    return false; //static component
  }

  render() {

    console.log('Render Header');

    return (
      <h1 className="main-brand">
      SVG TREE
      </h1>
    );
  }
}
