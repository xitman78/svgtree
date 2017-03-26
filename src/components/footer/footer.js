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

  render() {

    console.log('Render Footer');

    return (
      <Paper className="AppFooter">
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
