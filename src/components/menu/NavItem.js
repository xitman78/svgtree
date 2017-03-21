import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { createStructuredSelector} from 'reselect'

class NavItem extends React.Component {
  render () {
    const { route } = this.props;
    console.log('route', route);
    const { index, onlyActiveOnIndex, to, children } = this.props

    const isActive = (route === to);

    let style = isActive ? { 'borderBottom': '2px solid rgba(255,255,255,1)'} : {};

    return (
      <Link className="menu-link" style={style} to={to}>{children}</Link>
    )
  }
}
const mapStateToProps = createStructuredSelector({
  route: state => state.getIn(['route', 'locationBeforeTransitions', 'pathname'])
});

export default connect(mapStateToProps, {})(NavItem);
