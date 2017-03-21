import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Icon } from 'react-fa'
import MainHeader from './components/header'
import ModalAlert from './components/modals/alert'
import MySnackbar from './components/modals/snackbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Footer from './components/footer'
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
              <div className="App-header">
                <Link className="menu-link" to="/"><Icon name="home" className="menu-icon"/>Home</Link>
                <Link className="menu-link" to="/bounce">Bounce</Link>
                <Link className="menu-link" to="/works">Works</Link>
                <Link className="menu-link" to="/posts">Blog</Link>
              </div>
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
