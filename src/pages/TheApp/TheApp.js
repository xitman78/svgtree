import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { createStructuredSelector } from 'reselect'
import Helmet from 'react-helmet'

import WorkSpace from '../../components/WorkSpace/WorkSpace'

import './TheApp.sass'


export default class TheApp extends Component {

  render() {

    console.log('Render App*');

    return (
      <div>
          <Helmet title="SVG Tree :: The App" />
          <WorkSpace />
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   svgFile: state => state.get('svgFile'),
// });

// export default connect(
//   {},
//   {}
// )(Home);
