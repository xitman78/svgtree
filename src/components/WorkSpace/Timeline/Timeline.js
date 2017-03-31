import React from 'react'

import SvgTree from './SvgTree/SvgTree'

import './Timeline.sass'

export default class Timeline extends React.Component {

  render() {
    return (
      <div className="timeline-wrapper">
        <SvgTree />
      </div>
    );
  }

}
