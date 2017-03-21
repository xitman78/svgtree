import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { createStructuredSelector } from 'reselect'
import Helmet from 'react-helmet'

import { fetchWorks, currentWorkChanged, swapChild, swappedDrop } from '../../actions/worksActions'
import { fireAlert, fireSnackbar, closeAlert } from '../../actions/modalsActions'
import DropContainer from '../../components/drop-container'
import './works.sass'

class Works extends Component {

  // static propTypes = {
  //   works: PropTypes.shape({
  //     works: PropTypes.array.isRequired,
  //     currentWork: PropTypes.number.isRequired
  //   }).isRequired,
  //
  //   fetchWorks: PropTypes.func.isRequired,
  //   currentWorkChanged: PropTypes.func.isRequired,
  //   fireAlert: PropTypes.func.isRequired,
  //   fireSnackbar: PropTypes.func.isRequired,
  // }


  componentDidMount() {
    this.props.fetchWorks();
  }

  handleChange(event, index, value) {
    this.props.currentWorkChanged(value);
  }

  fireAlert() {
    // const myAction = [ <button onClick={this.props.closeAlert}>Hello</button> ];

    this.props.fireAlert({message: 'This is first Material UI alert!', title: 'Hello World!', buttonText: 'Okay', modal: true});
  }

  fireSnackbar() {
    this.props.fireSnackbar({message: 'This is first Material UI SnackBar!', duration: 5000 });
  }

  render() {

    console.log('Render Works');

    const worksList = this.props.works.get('works');
    const currentWork = this.props.works.get('currentWork');

    const work = worksList.find(w => w.id === currentWork);

    return (
      <div>
        <Helmet title="Works :: React Magics" />
        <h2 className="page-title">Works</h2>
        <div>
          <SelectField
            className="works-selector"
            floatingLabelText="Select work"
            value={currentWork}
            onChange={this.handleChange.bind(this)}>
            <MenuItem value={0} primaryText="none" />
            {worksList.map(w => <MenuItem key={w.id} value={w.id} primaryText={w.title} />)}
          </SelectField>
        </div>
        <RaisedButton label="Click me" secondary={true} onTouchTap={this.fireAlert.bind(this)} style={{marginRight: '16px'}}/>
        <RaisedButton label="Submit" primary={true} onTouchTap={this.fireSnackbar.bind(this)} style={{marginRight: '16px'}}/>
        <RaisedButton label="Swap" onTouchTap={this.props.swapChild} />
        <div className="swapper-container">
          <DropContainer dropId="left" />
          <DropContainer dropId="right" />
          <DropContainer dropId="down" />
          <DropContainer dropId="four" />
        </div>
        <div className="work-details">
        {
          work ? <div>
                  Work details:<br />
                  Title: {work.title}
                </div>
            : ''
        }
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  works: state => state.get('works'),
});

export default connect(
  mapStateToProps,
  { fetchWorks, currentWorkChanged, fireAlert, fireSnackbar, closeAlert, swapChild, swappedDrop }
)(Works);
