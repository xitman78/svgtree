import React, { Component }  from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector} from 'reselect'

import MainMenu from 'components/menu/menu'
import ToolBar from 'components/WorkSpace/ToolBar/ToolBar'

import './header.sass'

class MainHeader extends Component {

  // shouldComponentUpdate(nextProps) {
  //   return false; //static component
  // }

  render() {

    console.log('Render Header');

    let exClass = this.props.route === '/' ? 'fixed' : 'flex';

    return (
      <div className={'top-header ' + exClass}>
        <h1 className="main-brand">
          SVG Reactor
        </h1>
        <div className="brand-desription">
          Web Animation Toolkit
        </div>
        <MainMenu />
        { exClass === 'fixed' && <ToolBar /> }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  route: state => state.getIn(['route', 'locationBeforeTransitions', 'pathname'])
});


export default connect(mapStateToProps, {})(MainHeader);
