import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { createStructuredSelector } from 'reselect'
import Helmet from 'react-helmet'

import SvgImport from '../../components/SvgImport/SvgImport'
import SvgShow from '../../components/SvgShow/SvgShow'

import './home.sass'


export default class Home extends Component {

  render() {

    console.log('Render App*');

    return (
      <div>
          <Helmet title="SVG Tree :: App" />
          <SvgImport />
          <SvgShow />
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
