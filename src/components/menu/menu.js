import React from 'react'
import { Link } from 'react-router'
// import { Icon } from 'react-fa'
import NavItem from './NavItem'
import './menu.sass'

class MainMenu extends React.Component {

  render() {
    return (
      <div className="main-menu">
        <NavItem className="menu-link" activeClassName="menu-link-active" to="/" index={true}>The App</NavItem>
        <NavItem className="menu-link" activeClassName="menu-link-active" to="/bounce">Timeline</NavItem>
        <NavItem className="menu-link" activeClassName="menu-link-active" to="/works">Export</NavItem>
        <NavItem className="menu-link" activeClassName="menu-link-active" to="/posts">How To</NavItem>
      </div>
    );
  }
}

export default MainMenu;
