import React, { Component } from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import { createStructuredSelector} from 'reselect'
import MainHeader from './components/header/header'
import ModalAlert from './components/modals/alert'
import MySnackbar from './components/modals/snackbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Footer from './components/footer/footer'
import muiTheme from './MuiTheme'
import { resizeAction } from 'actions/resizeAction'
import './App.sass'


class App extends Component {

  componentDidMount() {
    this.props.resizeAction();
  }

  render() {

    let exClass = this.props.route === '/' ? 'fixed' : 'flex';

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
          <div className={'App ' + exClass}>
            <div className={'AppContent ' + exClass}>
              <ModalAlert />
              <MySnackbar />
              <MainHeader />
                {this.props.children}
            </div>
            <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

injectTapEventPlugin();

const mapStateToProps = createStructuredSelector({
  route: state => state.getIn(['route', 'locationBeforeTransitions', 'pathname'])
});

export default connect(mapStateToProps, { resizeAction })(App);
