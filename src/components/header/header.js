import React, { Component }  from 'react'
import './header.sass'

export default class MainHeader extends Component {

  shouldComponentUpdate(nextProps) {
    return false; //static component
  }

  render() {

    console.log('Render Header');

    return (
      <div className="top-header">
        <h1 className="main-brand">
          SVG Reactor
        </h1>
        <div className="brand-desription">
          Web Animation Toolkit
        </div>
      </div>
    );
  }
}
