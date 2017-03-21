import React from 'react'
import { Link } from 'react-router'
// import { Icon } from 'react-fa'

import './menu.sass'

class MainMenu extends React.Component {

  shouldComponentUpdate() {
    return false; // static menu
  }

  render() {
    return (
      <div className="main-menu">
        <Link className="menu-link" to="/">Import SVG</Link>
        <Link className="menu-link" to="/bounce">Timeline</Link>
        <Link className="menu-link" to="/works">Export</Link>
        <Link className="menu-link" to="/posts">Docs</Link>
      </div>
    );
  }
}

export default MainMenu;
