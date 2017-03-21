import React, { Component } from 'react'
import './post-info.sass'

export default class PostInfo extends Component {

  render() {
    return (
      <div className="post-info">
        <h4 className="post-info-title">{this.props.title}</h4>
        <p className="post-info-body">{this.props.body}</p>
      </div>
    );
  }

}
