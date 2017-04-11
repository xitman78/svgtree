import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector} from 'reselect'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import FontIcon from 'material-ui/FontIcon'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import Paper from 'material-ui/Paper'

import Timeline from 'components/WorkSpace/Timeline/Timeline'
import './footer.sass'

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

class Footer extends Component {

  componentWillMount() {
    this.setState({ height: '200px', y: 200 });
  }

  startFooterResize(event) {

    if(this.state.dragStarted) {
      console.log('Drag already started');
      return;
    }

    let ov = event.nativeEvent;

    this.setState({ dragStarted: true, lastY: ov.pageY });

    let moveHandler = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      if(this.state.dragStarted) {
        let offsetY = this.state.lastY - ev.pageY;
        let y = (this.state.y + offsetY);
        y = y < 50 ? 50 : y;
        let height = y + 'px';
        this.setState({lastY: ev.pageY, y, height });
      }
   };

   let upHandler = (ev) => {
     ev.preventDefault();
     ev.stopPropagation();
     if(this.state.dragStarted) {
       let offsetY = this.state.lastY - ev.pageY;
       let y = (this.state.y + offsetY);
       y = y < 50 ? 50 : y;
       let height = y + 'px';
       this.setState({dragStarted: false, y, height });
       window.removeEventListener('mousemove', moveHandler);
       window.removeEventListener('mouseup', upHandler);
      // this.props.fireSnackbar({message: 'Possition changed!'});
      // this.props.draggedMoved(x, y);
     }
   };

   window.addEventListener('mousemove', moveHandler);
   window.addEventListener('mouseup', upHandler);

  }

  render() {

    console.log('Render Footer');

    let exClass = this.props.route === '/' ? 'fixed' : 'flex';

    let splitterStyle = { height: this.state.height };

    console.log('splitterStyle', splitterStyle);

    return (
      <Paper className={'AppFooter ' + exClass} style={splitterStyle}>
        <div className="footer-splitter" onMouseDown={this.startFooterResize.bind(this)}></div>
        {
          this.props.route === '/' ?
          <Timeline />
          :
          <BottomNavigation selectedIndex={1}>
          <BottomNavigationItem
            label="Recents"
            icon={recentsIcon}
          />
          <BottomNavigationItem
            label="Favorites"
            icon={favoritesIcon}
          />
          <BottomNavigationItem
            label="Nearby"
            icon={nearbyIcon}
          />
          </BottomNavigation>
        }
    </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  route: state => state.getIn(['route', 'locationBeforeTransitions', 'pathname'])
});

export default connect(mapStateToProps, {})(Footer);
