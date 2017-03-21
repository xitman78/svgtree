import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Helmet from 'react-helmet'

import { selectBounce } from '../../actions/actionCreator'
import bounceList from '../../animations/bounce'
import './bouncer.sass'


class Bouncer extends Component {

  startBounce(ev) {

    let target = ev.target;

    bounceList[this.props.bounce].applyTo(target);

  }

  bounceChange(event, index, value) {
    this.props.selectBounce(value);
  }

  render() {

    console.log('Render Bounce');

    const bounce = this.props.bounce;
    return (
      <div>
          <Helmet title="Bounce :: React Magics"/>
          
          <h2 className="page-title">Reactive Bounces</h2>

          <SelectField
            className="works-selector"
            floatingLabelText="Bounce preset"
            value={bounce}
            onChange={this.bounceChange.bind(this)}>
            {Object.keys(bounceList).map(preset => <MenuItem key={preset} value={preset} primaryText={bounceList[preset].title} />)}
          </SelectField>

          <div className="bouncer-container">
            <div className="bouncer" id="bouncer" onClick={this.startBounce.bind(this)}></div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  bounce: state => state.getIn(['comments', 'bounce']),
});

export default connect(
  mapStateToProps,
  { selectBounce }
)(Bouncer);
