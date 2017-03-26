import React from 'react'
import { connect } from 'react-redux'

import ArtBoard from './ArtBoard/ArtBoard'
import ToolBar from './ToolBar/ToolBar'
// import Timeline from './Timeline/Timeline'
import SvgImport from './SvgImport/SvgImport'

export default class WorkSpace extends React.Component {

  render() {
    return (
      <div className="work-space-wrapper">
          <ToolBar />
          <div className="middle-wrapper">
            <ArtBoard />
          </div>
      </div>
    );

    // <SvgImport />

  }

}

//export default WorkSpace;
