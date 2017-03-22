import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { createStructuredSelector} from 'reselect'

class NavItem extends React.Component {
  render () {

    const { route, to, children } = this.props
    const isActive = (route === to);

    let className = isActive ? 'menu-link active' : 'menu-link';

    return (
      <Link className={className} to={to}>{children}</Link>
    )
  }
}
const mapStateToProps = createStructuredSelector({
  route: state => state.getIn(['route', 'locationBeforeTransitions', 'pathname'])
});

export default connect(mapStateToProps, {})(NavItem);
