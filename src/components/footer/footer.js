import React, { Component } from 'react'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import FontIcon from 'material-ui/FontIcon'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import Paper from 'material-ui/Paper'

import './footer.sass'

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

export default class Footer extends Component {

  shouldComponentUpdate(nextProps) {
    return false; //static component
  }

  render() {

    console.log('Render Footer');

    return (
      <Paper className="AppFooter">
        <BottomNavigation selectedIndex={1} style={{'minHeight': '200px'}}>
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
    </Paper>
    );
  }
}
