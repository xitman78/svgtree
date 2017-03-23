import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { createStructuredSelector } from 'reselect'
import Helmet from 'react-helmet'

import SvgImport from '../../components/SvgImport/SvgImport'
import './home.sass'


export default class Home extends Component {

  render() {

    console.log('Render App*');

    return (
      <div>
          <Helmet title="SVG Tree :: App" />
          <SvgImport />
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
