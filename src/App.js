import React, { Component } from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'

import MainHeader from './components/header/header'
import MainMenu from './components/menu/menu'
import ModalAlert from './components/modals/alert'
import MySnackbar from './components/modals/snackbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Footer from './components/footer/footer'
import muiTheme from './MuiTheme'
import './App.sass'

class App extends Component {

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
          <div className="App">
            <div className="AppContent">
              <ModalAlert />
              <MySnackbar />
              <MainHeader />
              <MainMenu />
                {this.props.children}
            </div>
            <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

injectTapEventPlugin();

export default connect(state => ({}), {})(App);
